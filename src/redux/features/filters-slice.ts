import { createSlice } from "@reduxjs/toolkit";

type filterStructure = {
  value: string;
  label: string;
};

type FilterState = {
  createdByOptions: Array<filterStructure>;
  responsibleOptions: Array<filterStructure>;
  tagOptions: Array<filterStructure>;

  selectedCreatedBy: filterStructure;
  selectedResponsible: filterStructure;
  selectedTag: filterStructure;
};

const initialState: FilterState = {
  createdByOptions: [],
  responsibleOptions: [],
  tagOptions: [],

  selectedCreatedBy: { value: "", label: "Created By" },
  selectedResponsible: { value: "", label: "Responsible" },
  selectedTag: { value: "", label: "Tag" },
};

export const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCreatedByOptions: (state, action) => {
      state.createdByOptions = action.payload;
    },
    setResponsibleOptions: (state, action) => {
      state.responsibleOptions = action.payload;
    },
    setTagOptions: (state, action) => {
      state.tagOptions = action.payload;
    },
    setSelectedCreatedBy: (state, action) => {
      state.selectedCreatedBy = action.payload;
    },
    setSelectedResponsible: (state, action) => {
      state.selectedResponsible = action.payload;
    },
    setSelectedTag: (state, action) => {
      state.selectedTag = action.payload;
    },
    resetAllSelected: (state) => {
      state.selectedCreatedBy = initialState.selectedCreatedBy;
      state.selectedResponsible = initialState.selectedResponsible;
      state.selectedTag = initialState.selectedTag;
    },
  },
});

export const {
  setCreatedByOptions,
  setResponsibleOptions,
  setTagOptions,
  setSelectedCreatedBy,
  setSelectedResponsible,
  setSelectedTag,
  resetAllSelected,
} = filter.actions;
export default filter.reducer;
