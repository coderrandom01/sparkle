import { Box, Container, Grid2, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, CategoryDragTable, ImageInput, ImagePreview, SelectInput, StyledHR } from "../../assets/style/index";
import TextInputComponent from "../fieldInputs/TextInput";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from "../../apollo/mutation";
import { GET_ALL_CATEGORIES } from "../../apollo/query";
import LoaderHorse from "../../Components/loaderHorse";
import { toast } from "react-toastify";
import { validation } from "HelperFunctions/validation";
import { isValid, s3ImgUrl } from "HelperFunctions/basicHelpers";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// components
import { SectionHeader, Header3 } from "admin/Navigation/Header/SectionHeader";
import { ContainedButton, OutlinedButton } from "../../Components/Buttons/Button";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
const initialData = {
  parents: {
    kids: { id: "kids", title: "Kids", children: ["kurthis", "tops", "tshirts", "jeans"] },
    adults: { id: "adults", title: "Adults", children: ["shirts", "trousers"] },
    elders: { id: "elders", title: "Elders", children: ["sweaters", "scarves"] },
  },
};

export default function ManageCategory() {
  const [data, setData] = useState<any>(initialData);
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [deleteCategoryData] = useMutation(DELETE_CATEGORY);
  const [errors, setErrors] = useState<any>({});
  const [isParent, setIsParent] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  // const [getAllCategory] = useQuery(GET_ALL_CATEGORIES)
  const [preview, setPreview] = useState<any>("");
  const [parentOptions, setParentOptions] = useState<any>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<any>({ kids: true, adults: false, elders: false });
  const [newImage,setNewImage] = useState<boolean>(false)
  const [formData, setFormData] = useState<any>({
    category_name: "",
    image: "",
    is_parent: true,
  });
  const { data: categoriesData, loading, error, refetch } = useQuery(GET_ALL_CATEGORIES);
  useEffect(() => {
    if (categoriesData) {
      const categoriesResponse = categoriesData.getAllCategory.response;
      const parents: any = {};
      let parent_data: any = [];
      categoriesResponse.forEach((parent: { category_name: any; children: any; _id: any }) => {
        const { category_name, children, _id } = parent;
        const childNames = children.map((child: { category_name: any; _id: string }) => {
          const childCat = { categoryName: child.category_name, id: child._id };
          return childCat;
        });
        parents[category_name.toLowerCase()] = {
          id: _id,
          title: category_name,
          children: childNames,
        };
        const parentStructure = { title: category_name, id: _id };
        parent_data.push(parentStructure);
      });
      const parentData: any = { parents: parents };
      setData(parentData);
      setLoader(false);
      setParentOptions(parent_data);
    }
  }, [categoriesData]);
  const fileInputRef = useRef<HTMLInputElement | any>(null);

  const handleDivClick = () => {
    // Trigger the file input's click event
    fileInputRef.current.click();
  };
  const onDragEnd = (result: { source: any; destination: any }) => {
    // const { source, destination } = result;
    // if (!destination) return;
    // const sourceParentId = source.droppableId;
    // const destParentId = destination.droppableId;
    // const sourceParent = data.parents[sourceParentId];
    // const destParent = data.parents[destParentId];
    // const draggedChildId = sourceParent.children[source.index];
    // // Remove child from source parent
    // const newSourceChildren = Array.from(sourceParent.children);
    // newSourceChildren.splice(source.index, 1);
    // // Add child to destination parent
    // const newDestChildren = Array.from(destParent.children);
    // newDestChildren.splice(destination.index, 0, draggedChildId);
    // // Update state
    // setData({
    //   ...data,
    //   parents: {
    //     ...data.parents,
    //     [sourceParentId]: {
    //       ...sourceParent,
    //       children: newSourceChildren,
    //     },
    //     [destParentId]: {
    //       ...destParent,
    //       children: newDestChildren,
    //     },
    //   },
    // });
  };
  const handleDeleteField = () => {
    const data = formData;
    data.image = ""
    setFormData(data)
    setPreview("")
  }
  const toggleDropdown = (parentId: string) => {
    setExpanded({ ...expanded, [parentId]: !expanded[parentId] });
  };
  const changeFunction = (e: { target: { files?: any; name?: any; value?: any } }) => {
    const { name } = e.target;

    if (name === "image") {
      const { files } = e.target; // Corrected from `e.target` to `e.target.files`
      const files1: any = Array.from(files);
      if (files1.length > 0) {
        const reader = new FileReader(); // Initialize FileReader
        reader.onloadend = () => {
          setPreview(reader.result);
         isEdit && setNewImage(true)
          setFormData((prev: any) =>
            isEdit
              ? { ...prev, [name]: files1[0], isNewImage: true }
              : {
                  ...prev,
                  [name]: files1[0], // Dynamically update the field with name "image"
                }
          );
          setErrors((prev: any) => ({ ...prev, [name]: "" }));
        };
        reader.readAsDataURL(files1[0]); // Read file and trigger `onloadend`
      }
    } else if (name === "parent_id") {
      const { value } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
        is_parent: false,
      }));
    } else {
      const { value } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
  };
  const submit = async () => {
    // delete formData.parent_id;
    // const formDataa = {...formData}
    console.log("formDataaa",formData,newImage);
    const valid = validation("manageCategory", formData);
    if( isEdit && !newImage){
      delete formData.image
      formData.isNewImage = false
    }
    setErrors(valid);
    if (isValid(valid)) {
      try {
        setLoader(true);
        const data = isEdit
          ? await updateCategory({
              variables: {
                data: formData,
              },
            })
          : await createCategory({
              variables: {
                data: formData,
              },
            });
        await refetch();
        toast.success("Success! The operation completed successfully.");
      } catch (error) {
        toast.error("Error! Something went wrong.");
      } finally {
        setLoader(false); // Ensure the loading spinner stops
      }
    }
    // createCategory(formData)
  };
  const handleParentClick = (parentId: any) => {
    const categoriesResponse = categoriesData.getAllCategory.response;
    const parent = categoriesResponse.find((item: any) => item._id === parentId);
    const formData = {
      id: parent._id,
      category_name: parent.category_name,
      image: parent.image,
      is_parent: true,
      status: "Active",

      // parent_id : parent._id
    };
    setFormData(formData);
    setPreview(parent.image);
    setIsEdit(true);
    setIsParent(true);
  };

  const handleChildClick = (childId: any) => {
    const categoriesResponse = categoriesData.getAllCategory.response;
    let selectedParent: any = null;
    let selectedChild: any = null;

    // Iterate through the parents to find the child and its corresponding parent
    categoriesResponse.forEach((parent: { children: any[] }) => {
      const child = parent.children.find((child) => child._id === childId);
      if (child) {
        selectedParent = parent;
        selectedChild = child;
      }
    });

    // setSelectedParent(selectedParent); // Update parent state
    // setSelectedChild(selectedChild); // Update child state
    const formData = {
      id: selectedChild._id,
      category_name: selectedChild.category_name,
      image: selectedChild.image,
      is_parent: false,
      parent_id: selectedParent._id,
      status: "Active",
    };
    setFormData(formData);
    setPreview(selectedChild.image);
    setIsParent(false);
    setIsEdit(true);
  };
  const deleteCategory = async () => {
    try {
      setLoader(true);

      await deleteCategoryData({ variables: { data: { id: formData.id } } });
      await refetch();
      toast.success("Success! The operation completed successfully.");
    } catch (e) {
      // alert("Ann error occured please try again later")
      toast.error("Error! Something went wrong.");
    } finally {
      setLoader(false);
    }
  };
  const reset = () => {
    const formData = {
      category_name: "",
      image: "",
      is_parent: true,
    };
    setIsEdit(false);
    setIsParent(false);
    setFormData(formData);
    setPreview("");
  };
  return (
    <>
      {loader && <LoaderHorse />}
      <Container className="admin-Content-view" maxWidth="xl">
        <div className="flex justify-between items-center w-full">
          <SectionHeader title="Manage Categories" />
          <OutlinedButton name="Add Category" handleClick={reset} />
        </div>
        <div className="grid grid-cols-6 gap-6">
          <div className="border border-gray-500 rounded-md p-4 drop-shadow-md">
            <DragDropContext onDragEnd={onDragEnd}>
              {Object.values(data.parents).map((parent: any) => {
                return (
                  <div
                    key={parent.id}
                    style={{
                      padding: "10px",
                    }}
                  >
                    {/* Parent Click */}
                    <div
                      className="parentContent cursor-pointer space-x-1 text-base"
                      onClick={() => {
                          handleParentClick(parent.id);
                          toggleDropdown(parent.id);
                      }}
                    >
                      <span>{parent.title}</span>
                      {
                        expanded[parent.id] ? <ArrowDropUp /> : <ArrowDropDown />
                      }
                      
                    </div>
                    {expanded[parent.id] && (
                      <Droppable droppableId={parent.id}>
                        {(provided) => (
                          <div className="child text-sm space-y-1 px-3 mt-2 py-2 bg-primary text-white rounded-lg" ref={provided.innerRef} {...provided.droppableProps}>
                            {parent.children.map((childId: any, index: number) => (
                              <Draggable key={childId.id} draggableId={childId.categoryName} index={index}>
                                {(provided) => (
                                  <div
                                    className="hover:bg-white hover:text-black hover:shadow-md rounded-sm p-1"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                    }}
                                    // Child Click
                                    onClick={() => handleChildClick(childId.id)}
                                  >
                                    {childId.categoryName}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    )}
                  </div>
                );
              })}
            </DragDropContext>
          </div>
          <div className="col-span-5 space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="form-control-space-y">
                <Header3 title="Category Title" />
                <TextInputComponent wid100={true} change={changeFunction} name="category_name" value={formData.category_name} placeholder="Category Title" />
                {errors.category_name && (
                  <p style={{ color: "red", fontSize: "12px" }} className="marNone">
                    {errors.category_name}
                  </p>
                )}
              </div>
              <div className="form-control-space-y">
                <Header3 title="Image" />
                <ImageInput onClick={handleDivClick}>
                  <input type="file" name="image" onChange={changeFunction} placeholder="Image" style={{ display: "none" }} ref={fileInputRef} />
                  <AddOutlinedIcon className="icon" />
                  <p>Image</p>
                </ImageInput>
                {errors.image && (
                  <p style={{ color: "red", fontSize: "12px" }} className="marNone">
                    {errors.image}
                  </p>
                )}
                {preview && (
                  <ImagePreview>
                    <div style={{ maxWidth: "100%", maxHeight: "300px", marginTop: "10px" }} className="relative">
                    <CloseOutlinedIcon className="closeIconBtn" onClick={() => handleDeleteField()}/>
                    <img src={isEdit && !newImage ? `${s3ImgUrl}${preview}` : preview } />

                    </div>
                  </ImagePreview>
                )}
              </div>
              {!isParent && (
                <div className="form-control-space-y">
                  <Header3 title="Category Type" />
                  <div className="d_flex">
                    <SelectInput wid100 onChange={changeFunction} name="parent_id" value={formData.parent_id}>
                      <option value="" disabled>
                        Select type
                      </option>
                      <option value="none">Parent</option>

                      {parentOptions.map((option: any) => (
                        <option key={option.id} value={option.id}>
                          {option.title}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                </div>
              )}
              {isEdit && (
                <div className="form-control-space-y">
                  <Header3 title="Status" />
                  <SelectInput wid100 onChange={changeFunction} name="status" value={formData.status}>
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Active">Active</option>
                    <option value="InActive">In-Active</option>

                    {parentOptions.map((option: any) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </SelectInput>
                </div>
              )}
            </div>
            <div className="space-x-4">
              <ContainedButton name={isEdit ? "Update" : "Save"} handleClick={submit} />
              <OutlinedButton name={isEdit ? "Delete" : "Cancel"} handleClick={isEdit ? deleteCategory : reset} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
