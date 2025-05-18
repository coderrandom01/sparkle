import { colors, Container, Grid2, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AddListingCss, Button, DragIng, ImageInput, SelectInput, StyledHR } from "../../assets/style/index";
import AdminSideBarComponent from "../Navigation/Sidebar/adminSideBar";
import TextInputComponent from "../fieldInputs/TextInput";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES, GET_PRODUCT_BY_ID, GET_PRODUCTBYID } from "apollo/query";
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";
import CancelIcon from "@mui/icons-material/Cancel";
import { CREATE_PRODUCT, EDIT_CATEGORY,DELETE_PRODUCT } from "apollo/mutation";
import { validation } from "HelperFunctions/validation";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { isValid, s3ImgUrl } from "HelperFunctions/basicHelpers";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ChromePicker, ColorResult } from "react-color";
import { SectionHeader } from "admin/Navigation/Header/SectionHeader";
import { ToggleField } from "admin/fieldInputs/toggleField";
import LoaderHorse from "Components/loaderHorse";
import { errorToast, sucessToast } from "HelperFunctions/utils";

export default function AddListing() {
  const [inputs, setInputs] = useState<any>([
    { type: "text", placeholder: "Product Name", value: "", name: "productname" },
    { type: "number", placeholder: "Product Number", value: "", name: "productnum" },
    { type: "select", placeholder: "Category", value: "", name: "category", options: ["Electronics", "Clothing", "Accessories"] },
    { type: "radio", placeholder: "In Stock", value: "", name: "instock", options: ["Yes", "No"] },
    { type: "file", placeholder: "Product Image", value: "", name: "productimage" },
    { type: "text", placeholder: "Price", value: "", name: "price" },
  ]);
  const navigate = useNavigate()
  const [images, setImages] = useState<any>([]);
  const [oldImages, setOldImages] = useState<any>()
  const [color, setColor] = useState("#FF0000");
  const [deletedImages, setDeletedImages] = useState<any>([]);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [editProduct] = useMutation(EDIT_CATEGORY);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [items, setItems] = React.useState([1, 2, 3, 4]);
  const options: Array<any> = ["Electronics", "Clothing", "Accessories"];
  const [parentOptions, setParentOptions] = useState<any>([]);
  const [childOptions, setChildOptions] = useState<any>([]);
  const [fields, setFields] = useState([
    // {
    //   size: "",
    //   price: "",
    //   discount: "",
    //   colors: [{ color: "Color", available_count: "" }],
    // },
  ]);
  const [colorFields, setColorFields] = useState<any>([
    {
      color: "",
      image : [],
      size_and_price: [{ available_count: "", discount: "",price : "", size : "" }],
    },
  ]);
  const [editedData, setEditedData] = useState<any>([]);
  const [showPicker, setShowPicker] = useState<any>(null);
  const pickerRefs: any = useRef([]); // Ref for multiple pickers
  const inputRefs: any = useRef([]); // Ref for multiple input areas
  const [categoriesResponse, setCategoriesResponse] = useState<any>([]);
  const [formData, setFormData] = useState<any>({ parent_category: "", category_id: "" });
  const [listingToogles, setListingToogles] = useState({ "top_selling_products": false, "clearance_sale": false, "new_arrivals": false, "explore_products": false })
  const { data: categoriesData, loading, error } = useQuery(GET_ALL_CATEGORIES);
  const [loader,setLoader] = useState<boolean>(false)
  // const {data : productById} = useQuery(GET_PRODUCT_BY_ID)
  // const [fields, setFields] = useState([
  //   { available_count: "", discount: "", price: "", size: "",color : "#000000" },
  // ]);
  const [errors, setErrors] = useState<any>({});
  // const fileInputRef : any = useRef<HTMLInputElement | any>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { id } = useParams();
  const handleDivClick = () => {
    // Trigger the file input's click event
    // fileInputRef.current.click();
  };
  const handleAddFields = () => {
    // setFields([
    //   ...fields,
    //   {
    //     size: "",
    //     price: "",
    //     discount: "",
    //     colors: [{ color: "Color", available_count: "" }],
    //   },
    // ]);
    setColorFields([
      ...colorFields,
      {
        color: "",
        image : [],
        size_and_price: [{ available_count: "", discount: "",price : "", size : "" }],
      },
    ]);
  };

  const variables = { getProductByIdId: id };
  const { data, refetch } = useQuery(GET_PRODUCTBYID, {
    variables,
    skip: !id,
  });
  useEffect(() => {
    setLoader(true)
    if (categoriesData && data) {
      console.log("datadata",data);
      const cleanData = removeTypename(data.getProductById.responce)
      const editData = cleanData;
      console.log("editDataeditData",cleanData);
const updatedColors = editData.colors.map(({ image, ...rest } : any) => ({
  ...rest,
  prevImage: [...image]
}));

      setColorFields(updatedColors)
      const categoriesResponse = categoriesData.getAllCategory.response;
      setEditedData(editData);
      const result = categoriesResponse.find((parent: { children: any[] }) => parent.children.some((child) => child._id === editData.category_id));
      const formData = { parent_category: result._id, category_id: editData.category_id, title: editData.title, description: editData.description};
      setListingToogles({ "top_selling_products": editData.top_selling_products, "clearance_sale": editData.clearance_sale, "new_arrivals": editData.new_arrivals, "explore_products": editData.explore_products })
      // const filedData = transformData(editData.size_and_price);
      // setFields(filedData);
      setFormData(formData);
      setChildOptions(result.children);
      // setOldImages(editData.image);
    }
    setLoader(false)
  }, [data,categoriesData]);
  useEffect(() => {
  if (id) {
    refetch(); // manually rehit the API
  }
}, [id]);
function removeTypename(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(removeTypename);
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (key !== '__typename' && key !== '_id') {
        newObj[key] = removeTypename(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

  useEffect(() => {
    setLoader(true)
    if (categoriesData) {
      const categoriesResponse = categoriesData.getAllCategory.response;
      const parents: any = {};

      categoriesResponse.forEach((parent: { category_name: any; children: any }) => {
        const { category_name, children } = parent;
        const childNames = children.map((child: { category_name: any }) => child.category_name);

        parents[category_name.toLowerCase()] = {
          id: category_name.toLowerCase(),
          title: category_name,
          children: childNames,
        };
      });
      const parentData: any = { parents: parents };
      const parentOptions = Object.values(parentData.parents).map((parent: any) => ({
        id: parent.id,
        title: parent.title,
      }));
      setParentOptions(parentOptions);
      setCategoriesResponse(categoriesResponse);
      // options = parentOptions
    }
    setLoader(false)
  }, [categoriesData]);
  const handleChangeComplete = (color: ColorResult, fieldIndex: any, colorIndex: number, field: string) => {
    setColor(color.hex);
    const updatedFields: any = [...fields];
    updatedFields[fieldIndex].colors[colorIndex][field] = color.hex;
    setFields(updatedFields);
    // handleColorChange(fieldIndex, colorIndex, "color", color.hex); // Update form data
  };

  const handleClick = (colorIndex: number | boolean | ((prevState: boolean) => boolean)) => {
    setShowPicker(showPicker === colorIndex ? null : colorIndex); // Toggle for specific index
  };

  const handleOutsideClick = (event: { target: any }) => {
    if (showPicker !== null && inputRefs.current[showPicker] && !inputRefs.current[showPicker].contains(event.target) && pickerRefs.current[showPicker] && !pickerRefs.current[showPicker].contains(event.target)) {
      setShowPicker(null); // Close any open picker
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showPicker]); // Add showPicker to dependency array

  const transformData = (data: any) => {
    return data.map((item: any) => ({
      size: item.size,
      price: item.price,
      discount: item.discount,
      colors: item.colors.map((color: any) => ({
        color: color.color,
        available_count: color.available_count,
      })),
    }));
  };
  const handleImageChange = (event: { target: { files: any } }) => {
    const files = Array.from(event.target.files);

    const newImages = files.map((file: any) =>
      Object.assign(file, {
        id: `${file.name}-${Date.now()}`, // Add unique ID for drag-and-drop
        preview: URL.createObjectURL(file), // Generate preview
      })
    );
    if (id) {
      setOldImages((prevImages: any) => [...prevImages, ...newImages])
      setImages((prevImages: any) => [...prevImages, ...newImages]);
    } else {
      setImages((prevImages: any) => [...prevImages, ...newImages]);
    }
  };
  const handleDragEnd = (sourceId: any, sourceIndex: number, targetIndex: number) => {
    const updatedImages = swap(images, sourceIndex, targetIndex);
    setImages(updatedImages);
  };
  const handleRemoveImage = (id: any) => {
    const updatedImages = images.filter((image: { id: any }) => image.id !== id);

    // Revoke preview URLs to free up memory
    const removedImage = images.find((image: { id: any }) => image.id === id);
    if (removedImage) {
      URL.revokeObjectURL(removedImage.preview);
    }

    setImages(updatedImages);
  };

  const handleDeleteField = (index: number) => {
    const updatedFields = colorFields.filter((_ : any, i : any) => {
      console.log("iiiiiiiiiiiiii",i,index);
      return i !== index});
    setColorFields(updatedFields);

    // Remove associated errors
    const updatedErrors = { ...errors };
    delete updatedErrors[index];
    setErrors(updatedErrors);
  };
  // const handleInputChange = (index: number, field: string, value: string) => {
  //   const updatedFields: any = [...fields];
  //   const sanitizedValue: any = value.replace(/[^0-9]/g, "");
  //   updatedFields[index][field] = !["price", "discount"].includes(field) ? value : sanitizedValue === "" || sanitizedValue === 0 ? 0 : Number(value);
  //   setFields(updatedFields);

  //   // Clear error if input becomes valid
  //   const updatedErrors = { ...errors };
  //   if (value.trim() !== "") {
  //     delete updatedErrors[index]?.[field];
  //     if (Object.keys(updatedErrors[index] || {}).length === 0) {
  //       delete updatedErrors[index];
  //     }
  //   }
  //   // setErrors(updatedErrors);
  // };
  const handleInputChange = (index: number, field: string, value: string) => {
    setColorFields((prevFields: any[]) =>
      prevFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };
  const handleInputChange_color = (colorIndex: number, field: string, value: string | number, sizeIndex?: number) => {
    setColorFields((prevFields: any[]) =>
      prevFields.map((colorField, i) =>
        i === colorIndex
          ? {
              ...colorField,
              size_and_price: colorField.size_and_price.map((sizeItem: any, j: number | undefined) =>
                j === sizeIndex ? { ...sizeItem, [field]: value } : sizeItem
              ),
            }
          : colorField
      )
    );
  };

  const handleToggle = (key: string) => {
    setListingToogles((prevState: any) => ({
      ...prevState,
      [key]: !prevState[key], // Toggle the value
    }));
  };
  const validateFields = (valid: any) => {
    const newErrors: { [key: number]: { [key: string]: any } } = {};

    fields.forEach((field: any, fieldIndex: number) => {
      const fieldErrors: { [key: string]: any } = {};

      // Validate top-level fields
      if (!field.size) fieldErrors.size = "Size is required.";
      if (!field.price) fieldErrors.price = "Price is required.";
      if (!field.discount) fieldErrors.discount = "Discount is required.";

      // Validate `colors` array
      if (field.colors?.length > 0) {
        field.colors.forEach((color: any, colorIndex: number) => {
          if (!color.color || color.color.trim() === "") {
            if (!fieldErrors.colors || fieldErrors.colors === "Color") fieldErrors.colors = {};
            fieldErrors.colors[colorIndex] = {
              ...(fieldErrors.colors[colorIndex] || {}),
              color: "Color is required.",
            };
          }
          if (!color.available_count || color.available_count === 0) {
            if (!fieldErrors.colors) fieldErrors.colors = {};
            fieldErrors.colors[colorIndex] = {
              ...(fieldErrors.colors[colorIndex] || {}),
              available_count: "Available count is required.",
            };
          }
        });
      } else {
        fieldErrors.colors = "At least one color is required.";
      }

      // Add field errors if any
      if (Object.keys(fieldErrors).length > 0) {
        newErrors[fieldIndex] = fieldErrors;
      }
    });

    setErrors((prev: any) => ({
      ...newErrors,
      ...valid,
    }));

    const validate = isValid(valid)
    return validate && Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const changeFunction = (name: any, value: string) => {
    setInputs((prevInputs: any[]) => prevInputs.map((input: any) => (input.name === name ? { ...input, value } : input)));
  };
  const changeFormData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "parent_category") {
      const childCategory = categoriesResponse.find((parent: any) => parent.category_name === value)?.children || [];
      setChildOptions(childCategory);
    }
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateColorFields = (data :  any) => {
    const errors: { [key: number]: { color?: string; size_and_price?: { [key: number]: { size?: string; price?: string; discount?: string; available_count?: string } } } } = {};
    let isValidError = true;
  
    colorFields.forEach((colorField : any, colorIndex : any) => {
      const colorErrors: { color?: string; size_and_price?: { [key: number]: { size?: string; price?: string; discount?: string; available_count?: string } } } = {};
  
      if (!colorField.color) {
        colorErrors.color = "Color is required";
        isValidError = false;
      }
  
      if (colorField.size_and_price && colorField.size_and_price.length > 0) {
        const sizePriceErrors: { [key: number]: { size?: string; price?: string; discount?: string; available_count?: string } } = {};
        colorField.size_and_price.forEach((sizePrice : any, sizeIndex : any) => {
          const itemErrors: { size?: string; price?: string; discount?: string; available_count?: string } = {};
          if (!sizePrice.size || sizePrice.size === "") {
            itemErrors.size = "Size is required";
            isValidError = false;
          }
          if (!sizePrice.price || sizePrice.price === 0) {
            itemErrors.price = "Price is required";
            isValidError = false;
          }
          if (!sizePrice.discount || sizePrice.discount === 0) {
            itemErrors.discount = "Discount is required";
            isValidError = false;
          }
          if (!sizePrice.available_count || sizePrice.available_count === 0) {
            itemErrors.available_count = "Available count is required";
            isValidError = false;
          }
          if (Object.keys(itemErrors).length > 0) {
            sizePriceErrors[sizeIndex] = itemErrors;
          }
        });
        if (Object.keys(sizePriceErrors).length > 0) {
          colorErrors.size_and_price = sizePriceErrors;
        }
      }

      
      if (Object.keys(colorErrors).length > 0) {
        console.log("colorErrorscolorErrors",colorErrors);
        console.log("object");
        errors[colorIndex] = colorErrors;
      }
    });
  
    // You can then use the 'errors' object to display validation messages to the user
    // and the 'isValid' boolean to determine if all fields are valid.
    console.log("Validation Errors:",     { errors,
      ...data});
    setErrors((prev: any) => ({
      ...errors,
      ...data,
    }));
    const validate = isValid(data)
    return validate && isValidError;
  }; 
  const submit = async () => {
    console.log("colorFields");
    // const newColorFields = colorFields.map((color: any) => ({
    //   ...color,
    //   image: color.image.map((img: any) => {
    //     const { preview, ...rest } = img;
    //     return rest; // return all properties except 'preview'
    //   })
    // }));
const newColorFields = colorFields.map((color: any) => {
  const { prevImage, ...rest } = color;
  return { ...rest };
});
const newColorFields1 = colorFields.map((color: any) => {
  const { prevImage, ...rest } = color;
  return {
    ...rest,
    image: Array.isArray(rest.image) ? rest.image : []
  };
});

    const formDataStore = { ...formData, colors: newColorFields };
    const editFormDataStore = { ...formData, colors: newColorFields1, delete_image: deletedImages, id: id };
    console.log("colorFields",colorFields);
    const valid = validation("addProduct", { ...formData, id: id });
    const isValid = validateColorFields(valid);
    console.log("isValiddddd",errors,isValid);
    console.log("validvalidvalidvalid",valid);
    // setErrors((prev : any) => ({...prev,...valid}))
    delete formDataStore.parent_category;
    delete editFormDataStore.parent_category;
    const formDataWithToggle = {...formDataStore,...listingToogles}
    console.log("formDataWithToggleformDataWithToggle",formDataWithToggle);
    const editFormDataStoreToggle = {...editFormDataStore,...listingToogles}
    setLoader(true)
    try {
      if (isValid) {
        const data = id
          ? await editProduct({
            variables: {
              data: editFormDataStoreToggle,
            },
          })
          : await createProduct({
            variables: {
              data: formDataWithToggle,
            },
          });
        setLoader(false)
        toast.success(id ? "Product updated successfully!" : "Product created successfully!");
        navigate("/admin/manageListings")
      } else {
    setLoader(false)
        toast.error("Validation failed. Please check the input fields.");
      }
    } catch (error) {
    setLoader(false)
      toast.error("An error occurred while creating the product.");
    }
  };
  const deleteBtn = async () => {
    try{
      const deleteProductData = await deleteProduct({
        variables: {
          deleteProductId : id,
        },
      })
      if(deleteProductData.data.deleteProduct.status === 200){
        sucessToast(deleteProductData.data.deleteProduct.result)
        navigate("/admin/manageListings")
      }else{
        errorToast(deleteProductData.data.deleteProduct.result)
      }
    }catch{
      errorToast("Something went wrong!")

    }
  }
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);

    setImages(reorderedImages);
  };
  // const onDragEndd = (result: any) => {
  //   if (!result.destination) return;

  //   const reorderedImages = Array.from(images);
  //   const [removed] = reorderedImages.splice(result.source.index, 1);
  //   reorderedImages.splice(result.destination.index, 0, removed);

  //   setImages(reorderedImages);
  // };
  const removeImage = (index: any) => {
    if (id) {
      const image = images.filter((_: any, id: any) => id === index);
      if (editedData.image.includes(image[0])) {
        setDeletedImages((prev: any) => [...prev, ...image]);
      }
    }
    setImages((prev: any) => prev.filter((_: any, i: any) => i !== index));
  };
  const handleAddColor = (fieldIndex: number) => {
    const updatedFields: any = [...fields];
    updatedFields[fieldIndex].colors.push({
      color: "", // Default color
      available_count: 0, // Default available count
    });
    setFields(updatedFields);
  };
  const handleRemoveColor = (fieldIndex: number, colorIndex: number) => {
    const updatedFields: any = [...fields];
    updatedFields[fieldIndex].colors.splice(colorIndex, 1);
    setFields(updatedFields);
  };
  const handleColorChange = (fieldIndex: number, colorIndex: number, field: string, value: string) => {
    const updatedFields: any = [...fields];
    updatedFields[fieldIndex].colors[colorIndex][field] = field === "color" ? value : Number(value);
    setFields(updatedFields);
  };
  const restrictPasteToNumbers = (e: React.ClipboardEvent) => {
    const pastedData = e.clipboardData.getData("Text");
    if (!/^\d*$/.test(pastedData)) {
      e.preventDefault();
    }
  };
  const restrictToNumbers = (e: React.KeyboardEvent) => {
    const charCode = e.key;

    if (!/^\d$/.test(charCode)) {
      e.preventDefault();
    }
  };
  const handleImageChange_1 = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
  
    setColorFields((prevFields: any[]) =>
      prevFields.map((item, i) =>
        i === index ? { ...item, image: [...(item.image || []), ...files] ,prevImage: [...(item.prevImage || []), ...newImages]} : item
      )
    );
  };
  const removeImage_1 = (colorIndex: number, imgIndex: number,img : any) => {
    setColorFields((prevFields: any[]) =>
      prevFields.map((item, i) =>
        i === colorIndex
          ? { ...item, image: item.image?.filter((_: any, index: number) => index !== imgIndex),prevImage :item.prevImage?.filter((_: any, index: number) => index !== imgIndex) }
          : item
      )
    );
    if(img){
      if(typeof img !== 'object'){
        const delImg = [...deletedImages,img]
        setDeletedImages(delImg)

      }
    }
  };
  const numberRestrictions = (event: any) => {
    if ((event.charCode >= 40 && event.charCode <= 57) || event.charCode === 46) {
      return true;
    } else {
      event.preventDefault();
    }
  };
  const imagesMap = id ? oldImages : images
  const onDragEndd : any = (result: any, colorIndex: number) => {
    if (!result.destination) return;
  
    // setColorFields((prevFields: any[]) =>
    //   prevFields.map((item, i) => {
    //     if (i === colorIndex) {
    //       const reorderedImages = Array.from(item.image || []);
    //       const [movedImage] = reorderedImages.splice(result.source.index, 1);
    //       reorderedImages.splice(result.destination.index, 0, movedImage);
    //       return { ...item, image: reorderedImages };
    //     }
    //     return item;
    //   })
    // );
  };
  const addSizeAndPrice = (colorIndex: number) => {
    setColorFields((prevFields: any[]) =>
      prevFields.map((colorField, i) =>
        i === colorIndex
          ? {
              ...colorField,
              size_and_price: [
                ...colorField.size_and_price,
                { available_count: "", discount: "", price: null, size: "" },
              ],
            }
          : colorField
      )
    );
  };
  const removeSizeAndPrice = (colorIndex: number, sizeIndex: number) => {
    console.log("colorIndexcolorIndex",colorIndex,sizeIndex);
    setColorFields((prevFields: any[]) => {
      console.log("prevFierl",prevFields);
      prevFields?.map((colorField, i) =>
        i === colorIndex
          ? { ...colorField, size_and_price: colorField.size_and_price.filter((_: any, j: number) => j !== sizeIndex) }
          : colorField
      )
    }
    );
  };  
  return (
    <div>
      {loader && <LoaderHorse />}
      <Container className="admin-Content-view" maxWidth="xl">
        <div className="flex justify-between items-center w-full">
          <SectionHeader title="Add Listing" />
        </div>
        <Grid2 container>
          <Grid2 size={{ xs: 12, md: 12 }}>
            {/* </Grid2> */}
            <Grid2 size={{ xs: 12, md: 12 }}>
              <AddListingCss>
                {/* <form> */}
                <Grid2 container spacing={2}>
                  {/* Label */}
                  <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                    <Typography variant="h6" className="font_16">
                      Parent Category :
                    </Typography>
                  </Grid2>

                  {/* Select Dropdown */}
                  <Grid2 size={{ xs: 12, md: 9 }}>
                    <SelectInput wid100 value={formData.parent_category} onChange={(e) => changeFormData(e)} name="parent_category">
                      <option value="" disabled>
                        Select Parent Category
                      </option>
                      {/* <option value= "">Select Parent Category</option> */}
                      {parentOptions &&
                        parentOptions?.map((option: any, idx: any) => (
                          <option key={idx} value={option.title}>
                            {option.title}
                          </option>
                        ))}
                    </SelectInput>
                  </Grid2>
                </Grid2>
                {formData.parent_category !== "" ? (
                  childOptions.length > 0 || formData.category_id !== "" ? (
                    <Grid2 container spacing={2} className="mtb10">
                      <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                        <Typography variant="h6" className="font_16">
                          Child Category :
                        </Typography>
                      </Grid2>
                      <Grid2 size={{ xs: 12, md: 9 }}>
                        <SelectInput wid100 value={formData.category_id} onChange={(e) => changeFormData(e)} name={"category_id"}>
                          <option value="" disabled>
                            Select Child Category
                          </option>
                          {/* <option value= "">Select Parent Category</option> */}
                          {childOptions &&
                            childOptions?.map((option: any, idx: any) => (
                              <option key={idx} value={option._id}>
                                {option.category_name}
                              </option>
                            ))}
                        </SelectInput>
                      </Grid2>
                    </Grid2>
                  ) : (
                    <p style={{ color: "red", textAlign: "center" }}>Need to Create a Child category for this parent</p>
                  )
                ) : (
                  <></>
                )}
                {formData.category_id && (
                  <Grid2 container spacing={2} className="mtb10">
                    <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                      <Typography variant="h6" className="font_16">
                        Title :
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 9 }}>
                      <TextInputComponent change={(e: React.ChangeEvent<HTMLSelectElement>) => changeFormData(e)} name="title" value={formData.title} placeholder="Title" wid100={true} error={errors.title} />
                      {errors.title && (
                        <p style={{ color: "red", fontSize: "12px" }} className="marNone">
                          {errors.title}
                        </p>
                      )}
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                      <Typography variant="h6" className="font_16">
                        Description :
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 9 }}>
                      <TextInputComponent change={(e: React.ChangeEvent<HTMLSelectElement>) => changeFormData(e)} name="description" value={formData.description} placeholder="Description" wid100={true} error={errors.description} />
                      {errors.description && (
                        <p style={{ color: "red", fontSize: "12px" }} className="marNone">
                          {errors.description}
                        </p>
                      )}
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 9 }} className="d-flex align-items-center">
                      <Typography variant="h6" className="font_16">
                        Listing Pricing Detail :
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 3 }} className="mtb10">
                      <Button wid100 cancelBtn onClick={handleAddFields}>
                        {" "}
                        + Add Price
                      </Button>
                    </Grid2>
                    {colorFields?.map((item: any, colorIndex: number) => {
  console.log("colorFieldscolorFields", item);
  return (
    <>
      <Grid2 size={{ xs: 12, md: 12 }}>
        <div style={{ position: "relative" }}>
          {colorIndex !== 0 && (
            <CloseOutlinedIcon
              onClick={() => handleDeleteField(colorIndex)}
              className="closeIconBtn"
              style={{ position: "absolute" }}
            />
          )}
          <StyledHR />  
        </div>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <TextInputComponent
          change={(e: { target: { value: string } }) =>
            handleInputChange(colorIndex, "color", e.target.value)
          }
          wid100={true}
          value={item.color}
          placeholder={"Color"}
          error={!!errors[colorIndex]?.color} // Check for color error
          errorMessage={errors[colorIndex]?.color} // Display color error message
          // onPaste={(e: React.ClipboardEvent<Element>) => restrictPasteToNumbers(e)}
        />
      </Grid2>
      <ImageInput onClick={() => fileInputRefs?.current[colorIndex]?.click()}>
        <input
          type="file"
          name="image"
          onChange={(e) => handleImageChange_1(colorIndex, e)}
          multiple
          style={{ display: "none" }}
          ref={(el: any) => (fileInputRefs.current[colorIndex] = el)}
        />
        <p>Image</p>
        <AddOutlinedIcon className="icon" />
      </ImageInput>
      <DragDropContext onDragEnd={(result) => onDragEndd(result, colorIndex)}>
        <Droppable droppableId={`imageGrid-${colorIndex}`} direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
            >
              {item?.prevImage?.map((img: any, imgIndex: number) => (
                <Draggable key={img.preview || `${s3ImgUrl}${img}`} draggableId={img.preview || `${s3ImgUrl}${img}`} index={imgIndex}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <img
                        src={img.preview || `${s3ImgUrl}${img}`}
                        alt="Draggable"
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}
                      />
                      <button
                        onClick={() => removeImage_1(colorIndex, imgIndex,img)}
                        style={{
                          position: "absolute",
                          top: -5,
                          right: -5,
                          background: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          cursor: "pointer",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {item.size_and_price?.map(
        (
          sizeItem: { size: any; price: any; discount: any; available_count: any },
          sizeIndex: any
        ) => (
          <div key={sizeIndex} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextInputComponent
                change={(e: { target: { value: string | number } }) =>
                  handleInputChange_color(colorIndex, "size", e.target.value, sizeIndex)
                }
                wid100={true}
                value={sizeItem.size}
                placeholder={"Size"}
                error={!!errors[colorIndex]?.size_and_price?.[sizeIndex]?.size} // Check for size error
                errorMessage={errors[colorIndex]?.size_and_price?.[sizeIndex]?.size} // Display size error message
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextInputComponent
                change={(e: { target: { value: string | number } }) =>
                  handleInputChange_color(colorIndex, "price", Number(e.target.value), sizeIndex)
                }
                wid100={true}
                value={String(sizeItem.price)}
                placeholder={"Price"}
                onKeyPress={(e: any) => numberRestrictions(e)}
                error={!!errors[colorIndex]?.size_and_price?.[sizeIndex]?.price} // Check for price error
                errorMessage={errors[colorIndex]?.size_and_price?.[sizeIndex]?.price} // Display price error message
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextInputComponent
                change={(e: { target: { value: string | number } }) =>
                  handleInputChange_color(colorIndex, "discount", Number(e.target.value), sizeIndex)
                }
                wid100={true}
                value={String(sizeItem.discount)}
                placeholder={"Discount"}
                onKeyPress={(e: any) => numberRestrictions(e)}
                error={!!errors[colorIndex]?.size_and_price?.[sizeIndex]?.discount} // Check for discount error
                errorMessage={errors[colorIndex]?.size_and_price?.[sizeIndex]?.discount} // Display discount error message
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextInputComponent
                change={(e: { target: { value: string | number } }) =>
                  handleInputChange_color(
                    colorIndex,
                    "available_count",
                    Number(e.target.value),
                    sizeIndex
                  )
                }
                wid100={true}
                value={String(sizeItem.available_count)}
                placeholder={"Available Count"}
                onKeyPress={(e: any) => numberRestrictions(e)}
                error={!!errors[colorIndex]?.size_and_price?.[sizeIndex]?.available_count} // Check for available_count error
                errorMessage={
                  errors[colorIndex]?.size_and_price?.[sizeIndex]?.available_count
                } // Display available_count error message
              />
            </Grid2>

            {/* Remove Button */}
            {sizeIndex !== 0 ? (
              <button
                onClick={() => removeSizeAndPrice(colorIndex, sizeIndex)}
                style={{ background: "red", color: "white", borderRadius: "50%", width: 25, height: 25 }}
              >
                ✕
              </button>
            ) : <></>}
          </div>
        )
      )}
      {/* Add More Size & Price */}
      <div>

      <button onClick={() => addSizeAndPrice(colorIndex)}>+ Add Size</button>
      </div>
      <div>
      <StyledHR />  

      </div>

    </>
  );
})}
                
                    {/* <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "20px" }}
      /> */}
                    {/* <ImageInput onClick={handleDivClick}>
                      <input type="file" name="image" onChange={handleImageChange} multiple placeholder="Image" style={{ display: "none" }} ref={fileInputRef} />
                      <p>Image</p>
                      <AddOutlinedIcon className="icon" />
                    </ImageInput> */}
                    {/* <DragIng count = {images.length}> */}

                    <DragDropContext onDragEnd={onDragEndd}>
                      <Droppable droppableId="imageGrid" direction="horizontal">
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                              display: "flex",
                              gap: "10px",
                              flexWrap: "wrap",
                            }}
                          >
                            {imagesMap?.map((src: any, index: any) => (
                              <Draggable key={src} draggableId={src} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      position: "relative",
                                      display: "inline-block",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <img
                                      src={src.preview || `${s3ImgUrl}${src}`}
                                      alt="Draggable"
                                      style={{
                                        width: 100,
                                        height: 100,
                                        objectFit: "cover",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                      }}
                                    />

                                    {/* Close Button */}
                                    <button
                                      onClick={() => removeImage(index)}
                                      style={{
                                        position: "absolute",
                                        top: -5,
                                        right: -5,
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        width: "20px",
                                        height: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    {/* </DragIng> */}
                  </Grid2>
                )}
                {id && (
                  <>
                    <Grid2 container>
                      <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                        <Typography variant="h6" className="font_16">
                          Status :
                        </Typography>
                      </Grid2>
                      <Grid2 size={{ xs: 12, md: 9 }}>
                        <>
                          <SelectInput wid100 onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeFormData(e)} name="status" value={formData.status || ""}>
                            <option value="" disabled>
                              Select Status
                            </option>
                            <option value="Active">Active</option>
                            <option value="InActive">In-Active</option>
                          </SelectInput>
                          {errors.status && (
                            <p style={{ color: "red", fontSize: "12px" }} className="marNone">
                              {errors.status}
                            </p>
                          )}
                        </>
                      </Grid2>
                    </Grid2>
                  </>
                )}
                {/* {formData.category_id && inputs.map((input: any, index: React.Key | null | undefined) => (
        <>
          {input.type === "text" || input.type === "number" || input.type === "price" ? (
            <Grid2 container spacing={2} key={index}>
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

              <Grid2 size = {{xs: 12,md: 9}}>
                <TextInputComponent
                  change={(e: { target: { value: any } }) => changeFunction(input.name, e.target.value)}
                  name={input.name}
                  value={inputs[input.name] || ''}
                  placeholder={input.placeholder}
                />
              </Grid2>
            </Grid2>
          ) : input.type === "select" ? (
            <Grid2 container spacing={2} key={index}>
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

              <Grid2 size = {{xs: 12,md: 9}}>
                <select
                  value={inputs[input.name] || ''}
                  onChange={(e) => changeFunction(input.name, e.target.value)}
                  name={input.name}
                >
                  <option value="" disabled>Select {input.placeholder}</option>
                  {input.options.map((option: any,idx : any) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Grid2>
            </Grid2>
          ) : input.type === "radio" ? (
            <Grid2 container spacing={2} key={index}>
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

              <Grid2 size = {{xs: 12,md: 9}}>
                {input.options.map((option: any, idx: React.Key | null | undefined) => (
                  <label key={idx}>
                    <input
                      type="radio"
                      name={input.name}
                      value={option}
                      checked={inputs[input.name] === option}
                      onChange={(e) => changeFunction(input.name, e.target.value)}
                    />
                    {option}
                  </label>
                ))}
              </Grid2>
            </Grid2>
          ) : input.type === "file" ? (
            <Grid2 container spacing={2} key={index}>
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

              <Grid2 size = {{xs: 12,md: 9}}>
                <input
                  type="file"
                  onChange={(e : any) => changeFunction(input.name, e.target.files[0])}
                  name={input.name}
                />
              </Grid2>
            </Grid2>
          ) : null}
        </>
      ))} */}
      {formData.category_id && (
                <Grid2 container>
                  <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                    <Typography variant="h6" className="font_16">
                      Top Selling Products :
                    </Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 9 }}>

                    <ToggleField
                      isOn={listingToogles.top_selling_products}
                      handleToggle={() => handleToggle("top_selling_products")}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                    <Typography variant="h6" className="font_16">
                      Clearance Sale :
                    </Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 9 }}>

                    <ToggleField
                      isOn={listingToogles.clearance_sale}
                      handleToggle={() => handleToggle("clearance_sale")}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                    <Typography variant="h6" className="font_16">
                      New Arrivals :
                    </Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 9 }}>
                    <ToggleField
                      isOn={listingToogles.new_arrivals}
                      handleToggle={() => handleToggle("new_arrivals")}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                    <Typography variant="h6" className="font_16">
                      Explore Products :
                    </Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 9 }}>
                    <ToggleField
                      isOn={listingToogles.explore_products}
                      handleToggle={() => handleToggle("explore_products")}
                    />

                  </Grid2>
                <Button saveBtn onClick={submit}>
                  Save
                </Button>
                {id &&
                <Button cancelBtn onClick={deleteBtn}>
                  Delete
                </Button>
                }
                </Grid2>

      )}

              </AddListingCss>
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}
