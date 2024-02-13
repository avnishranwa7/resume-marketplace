import { useState, useReducer, ChangeEvent, useEffect } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

// icons imports
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// styles imports
import classes from "./index.module.css";

// local imports
import Input from "../../components/Input";
import Tag from "../Create-Marketplace/Tag";
import { MarketplaceService } from "../../services/marketplace";
import { ResumeType } from "./types";
import ResumeItem from "./ResumeItem";

interface FilterType {
  tag: string;
}

const initialFilterState: FilterType = {
  tag: "",
};

interface ActionType {
  property: string;
  value: string;
}

function filterReducer(state: FilterType, action: ActionType) {
  if (action.property === "clear") return initialFilterState;

  return { ...state, [action.property]: action.value };
}

const Explore = () => {
  const [activeResumes, setActiveResumes] = useState<Array<ResumeType>>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [tags, setTags] = useState<Array<string>>([]);
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterState
  );

  async function getResumes(): Promise<Array<ResumeType>> {
    const response = await MarketplaceService.getResumes({ tags, page });
    const data = await response.json();
    setTotalPages(data.count);

    return data.resumes;
  }

  function toResumeData(data: any): ResumeType {
    return {
      id: data._id,
      userId: data.userId,
      tags: data.tags,
      resumes: data.resumes,
    };
  }

  const {
    data: resumes,
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["resumes"],
    queryFn: getResumes,
    select: (data) => data.map(toResumeData),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setActiveResumes(resumes ?? []);
  }, [resumes]);

  function addNewTag() {
    if (filterState.tag.length < 2) return;
    setTags((prevTags) => {
      if (prevTags.includes(filterState.tag)) return prevTags;
      return [...prevTags, filterState.tag];
    });
    filterDispatch({ property: "tag", value: "" });
  }

  function deleteTag(tag: string) {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  }

  async function onPageChange(e: ChangeEvent<unknown>, newPage: number) {
    if (newPage === page) return;

    if (totalPages <= 5) {
      setPage(newPage);
      return;
    }

    if (Math.abs(newPage - page) > 2) {
      setActiveResumes([]);
      setTimeout(() => {
        refetch();
      }, 0);
    } else {
      const response = await MarketplaceService.getResumes({
        page: newPage,
        tags,
        offset: newPage - page,
      });
      const data = await response.json();
      setActiveResumes((prev) => {
        const offset = newPage - page;
        if (offset > 0) {
          return [...prev.slice(offset * 10), ...data.resumes];
        }

        return [...data.resumes, prev.slice(0, (5 + offset) * 10)];
      });
      setPage(newPage);
    }
  }

  return (
    <div className={classes.explore}>
      <div className={classes["mobile-filters"]}>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <Typography>Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Input
              id="marketplace-tags"
              inputProps={{
                required: true,
                placeholder: "Tags",
                value: filterState.tag,
                onChange: (e) =>
                  filterDispatch({ property: "tag", value: e.target.value }),
              }}
              Icon={<AddCircleOutlineIcon />}
              iconClick={addNewTag}
              labelText="Tag length must be atleast 2 characters long"
            />
            <TagsDiv>
              {tags.map((tag) => (
                <Tag key={tag} tag={tag} deletable deleteTag={deleteTag} />
              ))}
            </TagsDiv>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="outlined"
              color="error"
              sx={{ fontSize: "0.8rem" }}
            >
              Clear Filters
            </Button>
            <Button variant="outlined" sx={{ fontSize: "0.8rem" }}>
              Apply Filters
            </Button>
          </AccordionActions>
        </Accordion>
      </div>
      <div className={classes["desktop-filters"]}>
        <h2>Filters</h2>
        <Input
          id="marketplace-tags"
          inputProps={{
            required: true,
            placeholder: "Tags",
            value: filterState.tag,
            onChange: (e) =>
              filterDispatch({ property: "tag", value: e.target.value }),
          }}
          Icon={<AddCircleOutlineIcon />}
          iconClick={addNewTag}
          labelText="Tag length must be atleast 2 characters long"
        />
        <TagsDiv>
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} deletable deleteTag={deleteTag} />
          ))}
        </TagsDiv>
        <div className={classes["filter-actions"]}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setPage(1);
              setTags([]);
              filterDispatch({ property: "clear", value: "" });
              setTimeout(() => {
                refetch();
              }, 0);
            }}
            sx={{ fontSize: "0.8rem" }}
          >
            Clear Filters
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setPage(1);
              setTimeout(() => {
                refetch();
              }, 0);
            }}
            sx={{ fontSize: "0.8rem" }}
          >
            Apply Filters
          </Button>
        </div>
      </div>
      {!isFetching && !isLoading && (
        <>
          <div className={classes.resumes}>
            {activeResumes?.slice((page - 1) * 10, page * 10).map((resume) => (
              <ResumeItem key={resume.id} resume={resume} />
            ))}
          </div>
          <div className={classes.pagination}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={onPageChange}
              color="primary"
              sx={{
                "& .MuiPagination-ul": {
                  flexWrap: "nowrap",
                  flexDirection: "row",
                  "@media screen and (max-width: 599px)": {
                    flexWrap: "wrap",
                    "& li": {
                      width: "fit-content",
                    },
                    justifyContent: "space-around",
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

const TagsDiv = styled.div`
  width: 100%;
  background-color: #e4e2e2;
  display: flex;
  flex-wrap: wrap;
`;

export default Explore;
