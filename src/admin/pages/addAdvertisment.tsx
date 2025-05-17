import { Container, Grid2 } from "@mui/material";
import { SectionHeader } from "admin/Navigation/Header/SectionHeader";
import { Button, ImageInput } from "assets/style";
import React, { useEffect, useRef, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ToggleField } from "admin/fieldInputs/toggleField";
import { CREATE_AD, DELETE_AD,EDIT_AD } from "apollo/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { validation } from "HelperFunctions/validation";
import { isValid, s3ImgUrl } from "HelperFunctions/basicHelpers";
import { GET_ALL_ADS } from "apollo/query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoaderHorse from "../../Components/loaderHorse";
import TextInputComponent from "admin/fieldInputs/TextInput";
import { errorToast, sucessToast } from "HelperFunctions/utils";

export function Advertisment() {
  const navigate = useNavigate()
  const [images, setImages] = useState<any>()
  const [url,setUrl] = useState<string>("")
  const [errors,setErrors] = useState<any>()
  const [isOn, setIsOn] = useState<boolean>(false)
  const [createAd] = useMutation(CREATE_AD);
  const [deleteAd] = useMutation(DELETE_AD);
  const [editAd] = useMutation(EDIT_AD)
  const [progress,setProgress] = useState<boolean>(false)
        const { data, loading, error, refetch } = useQuery(GET_ALL_ADS);
  const fileInputRef = useRef<HTMLInputElement | any>(null);
  const handleDivClick = () => {
    // Trigger the file input's click event
    fileInputRef.current.click();
  };
  const { id } = useParams();
  useEffect(() => {
    if(data){
      const selectedAd = data.getAllAd?.response?.filter((it : any) => it._id === id)
      if(selectedAd?.length > 0){
        setImages(`${s3ImgUrl}${selectedAd[0].imageUrl}`)
        setUrl(selectedAd[0].url)
        setIsOn(selectedAd[0].status === "active" ? true : false)
      }
    }
  },[data])
  const handleImageChange = (event: { target: { files: any } }) => {
    const files = Array.from(event.target.files);

    const newImages = files.map((file: any) =>
      Object.assign(file, {
        id: `${file.name}-${Date.now()}`, // Add unique ID for drag-and-drop
        preview: URL.createObjectURL(file), // Generate preview
      })
    );
    setErrors({image : ""});
    setImages(newImages);
  };
  const submit = async () => {
    const validate = validation("adManagement",{images,url})
    setErrors(validate)
    if(isValid(validate)){
    setProgress(true)
      if(!id){
        try{
          const addData =   await createAd({
            variables : {
              data : {
                image : images[0],
                url : url
              }
            }
          }) 
          if(addData.data.createAd.status === 200){
            sucessToast(addData.data.createAd.result)
          }
    setProgress(false)
    navigate("/admin/adManagement")

        }catch{
          errorToast("Something went wrong!")
    setProgress(false)
        }
      }else{
        try{
          const editData =  await editAd({
            variables : {
              data : {
                // image : images[0],
                id,
                url : url,
                status : isOn ? "Active" : "InActive"
              }
            }
          })  
          if(editData.data.editAd.status === 200){
            sucessToast(editData.data.editAd.result)
    setProgress(false)
    navigate("/admin/adManagement")

          }else{
            errorToast(editData.data.editAd.result)
    setProgress(false)

          }
        }catch{
          errorToast("Something went wrong!")
        }
      }
    }
  }
  const handleToggle = () => {
    setIsOn((prev: boolean) => !prev)
  }
  const deleteBtn = async () => {
    setProgress(true)
    try{
const adDeleted =  await deleteAd({
  variables : {
    data : {
      id : id
    }
  }
}) 
if(adDeleted.data.deleteAd.status === 200){
     toast.success("Ad Deleted successfully!");
    setProgress(false)
     navigate("/admin/adManagement")
  
}else{
  setProgress(false)
        toast.error("An error occurred while deleting the Ad.");
  
}
    }catch{
      toast.error("An error occurred while deleting the Ad.");

    }
  }
  const changeFormData = (e : any) => {
    const {value} = e.target;
    setUrl(value)
  }
  return (
     
    <Container className="admin-Content-view" maxWidth="xl">
      <div className="flex justify-between items-center w-full">
      {progress && <LoaderHorse />}
        <SectionHeader title="Add Advertisement" />
      </div>
      <Grid2 container>
      <Grid2 size = {{xs : 12,md : 2}} className = "mt-5 flex items-center">
          <p>Image : </p>
        </Grid2>
        <Grid2 size = {{xs : 12,md : 10}} className = "mt-5">
        <ImageInput onClick={handleDivClick}>
          <input type="file" name="image" onChange={handleImageChange} placeholder="Image" style={{ display: "none" }} ref={fileInputRef} />
          <p>Image</p>
          <AddOutlinedIcon className="icon" />
        </ImageInput>
        {errors?.image &&
        <p className = "text-red-500">Image is Required!</p>}
        </Grid2>
        {images?.length > 0 &&
          <>
            <Grid2 size={{ xs: 12, md: 12 }} className = "flex justify-center">
              <img className="mt-5 rounded-lg h-96 " src={images[0].preview || images} />
            </Grid2>
          </>
        }
        <Grid2 size = {{xs : 12,md : 2}} className = "mt-5 flex items-center">
          <p>Url : </p>
        </Grid2>
        <Grid2 size = {{xs : 12,md : 10}} className = "mt-5">
          <>
          <TextInputComponent change={(e: React.ChangeEvent<HTMLSelectElement>) => changeFormData(e)} name="Url" value={url} placeholder="Url" wid100={true} error={errors?.url} />
                    {errors?.url &&
        <p className = "text-red-500">Url is Required!</p>}
          </>
        </Grid2>
          {id &&
          <>
        <Grid2 size={{ xs: 12, md: 2 }} className = "flex items-center">
        <p>Status : </p>

        </Grid2>
        <Grid2 size={{ xs: 12, md: 10 }}>
          <div className="flex">
          <ToggleField isOn={isOn} handleToggle={handleToggle} />
          </div>
        </Grid2>
          </>
          }
        <Button saveBtn onClick={submit}>
          Save
        </Button>
        {id && 
        <Button cancelBtn onClick={deleteBtn}>
          Delete
        </Button>
        }

      </Grid2>
    </Container>
  );
}