import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { createGlobalStyle } from 'styled-components';
// import { SelectInputProps } from '@mui/material/Select/SelectInput';


const mainColor = "#FE8315"
const targetColor = "#F68B29"

interface TextFieldBoxProps{
    searchBox?: boolean
    Text? : boolean
}
interface DragImg{
  count : number
}
interface StyledHR{
  wid12? : boolean
}
interface ButtonProps{
  saveBtn? : boolean
  cancelBtn? : boolean
  wid100? : boolean
}
interface SelectInputProps{
  wid100? : boolean 
}
interface TextInputProps{
  error? : boolean
  wid100? : boolean
}
export const GlobalStyle = createGlobalStyle`
::-webkit-scrollbar {
  width: 10px;               /* Width of the scrollbar */
}
  .h50{
  height : 70vh;}

/* Track */
::-webkit-scrollbar-track {
  background: #f0f0f0;       /* Background of the scrollbar track */
  border-radius: 6px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;          /* Color of the scrollbar handle */
  border-radius: 6px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;          /* Color of the scrollbar handle on hover */
}
  .minWidth45{
  min-width : 45px !important;
  }
  .marNone{
  margin : 0px !important;}
  .errorText{
  color : red;
font-size : 12px;
margin:0px !important;}
.padLR5{
padding : 0px 5px !important;}
.sideBarContent{
background-color : #ffa50033 !important;
border-radius : 10px !important;
margin-top : 10px !important;
width :100%;}
.title{
font-weight : 500 !important;
font-size : 25px !important; }
.font_16{
font-size : 16px !important;}
.d-flex{
display : flex;
}
.align-items-center{
align-items : center;
 }
.mtb10{
margin : 10px 0px; }
.errorRed{
border : 1px solid red !important;
}
.passwordVisible{
position : absolute;
    right: 10px;
    top: 5px;
    width: 18px;
    color: gray !important;}
.btnMargin{
margin : -2px 0px !important;}
`;
export const TextFieldBox = styled(TextField)<TextFieldBoxProps>`
${(props : TextFieldBoxProps) => props.searchBox &&`
   .MuiInputBase-root{
   border : 0px solid #CECECE !important;
   border-radius : 20px !important;}
   .MuiInputBase-input{
   padding : 10px 4px !important; 
   font-size : 12px;
   } 
    `}
 ${(props : TextFieldBoxProps) => props.Text &&`
  .MuiInputBase-input{
   padding : 10px 4px !important; 
   font-size : 12px;
   }
   .MuiTextField-root{
   width : 100%;
   } 
   width : 100%;
   margin : 10px 0px !important;
   padding : 0px 5px !important;
  `}   
`

export const LoginPop = styled.div`
background-color : ${mainColor};
border-radius : 8px;
height : 450px;
.logo{
display : flex;
padding : 30px  30px 20px 30px;
svg{
margin-right : 10px;}
}
.logo svg, g, path{
fill : white;
}
.popImg{
position : relative;
bottom : -10px;
left : 50px;
img{
width :70%;
}
}
`

export const LoginSignUp = styled.div`
background-color : white;
padding : 20px;
margin: 10px;
border-radius: 10px;
height : 430px;
position : relative;
.closeIcon{
cursor :pointer;
position : absolute;
top : 0px;
right : 0px;
path{
fill : black !important;
}
}
.forgotPass{
color : ${mainColor};
text-align : right;
font-size : 12px;
font-weight : 600;
}
.submitBtn{
border-color : ${mainColor};
color : black;
font-weight : 500;
padding : 5px 50px;
display : flex;
justify-content : center;
}
.logBtn{
width : 50%;
text-align : center;
padding: 8px;
  border-radius: 8px;
  cursor :pointer;
  }
  .black{
    background: black;
  color: white;
  }
`
export const StyledHR = styled.hr<StyledHR>`
border: 1px solid #FFC21B;
margin: ${(props : StyledHR) => props.wid12 ? '5px 0' : '20px 0' } ;
${(props : StyledHR) => props.wid12 && `
  width : 12%;
  `}
`


export const ManageCategoryCss = styled.div`
.addBtn{
text-align : center;
padding: 10px;
  border-radius: 8px;
  cursor :pointer;
  border : 1px solid ${mainColor};
}
.categoryTitle{
font-size : 18px;
font-weight : 500;
margin : 10px 0px;}
.deleteContent{
text-align : right;
color : red;
font-size : 16px;
font-weight : 500; }
.d_flex{
display : flex;
justify-content : space-between;
align-items : center;}
`

export const CategoryDragTable = styled.div`
background: ${mainColor};
  border-radius: 10px;
  margin : 10px 10px 10px 15px;
  padding : 10px;
  .parentContent{
   display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size : 18px;
  font-weight : 600;
  color : white;
  .arrow{
  font-size : 12px !important;
  padding-right : 30px;
  padding-top : 2px;}
  }
  .child{
  padding: 6px;
  border-radius: 5px;
  color : white;
  div{
  padding: 8px;
  marginBottom: 5px;
 }
   }`


export const TextInput = styled.input<TextInputProps>`
border : 1px solid ${(props : TextInputProps) => props.error ? "red" : mainColor};
width:  ${(props : TextInputProps) => props.wid100 ? "100%" : "92%"};
  padding: 10px;
  font-size : 14px !important;
  border-radius: 10px;`

export const ImageInput = styled.div`
border : 1px solid ${mainColor};
width: 100%;
  padding: 10px 25px;
  border-radius: 10px;
  position: relative;
  .icon{
  position: absolute;
  right: 18px;
  color: white;
  background: ${mainColor};
  border-radius: 25px;
  top : 10px;
  }
`
export const SelectInput = styled.select<SelectInputProps>`
border : 1px solid ${mainColor};
  padding: 10px 8px;
  border-radius: 10px;
  width : ${(props : SelectInputProps) => props.wid100 ? "100%" : "30%"} ;
`

export const Button = styled.button<ButtonProps>`
padding : 10px;
border : 1px solid ${mainColor};
width : ${(props : ButtonProps) => props.wid100 ? "100%" : "20%" };
@media (max-width : 767px){
width : ${(props : ButtonProps) => props.wid100 ? "100%" : "50% !important" };
}
border-radius : 6px;
margin : 10px 5px;
${(props : ButtonProps) => props.saveBtn && `
  color : white;
  background : ${mainColor};
  `}
  ${(props : ButtonProps) => props.cancelBtn && `
    color : black;
    background : transparent;
    `}
`

export const AddListingCss = styled.div`
box-shadow: 1px 1px 9px 0 rgba(0, 0, 0, 0.21);
padding: 60px;
  margin: 40px 60px;
  border-radius : 10px;
  @media (max-width : 767px){
  margin: 10px 10px 10px 0px;
  }
.posRelative{
position : relative;
}
.closeBtn{
position: absolute;
  right: -5px;
  top: -12px;
  background: orange;
  padding: 4px;
  border-radius: 12px;
}
  .colorBox{
  border: 1px solid #FE8315;
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding: 5px 0px 0px 10px;
  input{
  width: 100%;
  height: 38px;
  border: medium;
  cursor: pointer;
  position: absolute;
  border-radius: 10px;
  right: 0px;
  bottom: 0px;
  }}
  .closeIconBtn{
  position: absolute;
  top: -12px;
  background: orange;
  border-radius: 15px;
  padding: 4px;
  right : -8px;}`

export const ImagePreview = styled.div`
div,img{
margin-top: 20px;
  height: 100px;
  width: 100px;
  object-fit: cover;}
    .closeIconBtn{
  position: absolute;
  top: -12px;
  background: orange;
  border-radius: 15px;
  padding: 4px;
  right : -8px;}
`

export const PageLoader = styled.div`
position: absolute;
  width: 100%;
  height: 100%;
  background: #80808094;
  display : flex;
  align-items :center;
  justify-content : center;
  z-index : 10000;
`

export const DragIng = styled.div<DragImg>`
.dropzone {
margin: 0 -2px;
> div {
padding: 6px;
}
height: ${(props : DragImg) => (
  (((props.count % 3) ? (Math.ceil(props.count/3)) : (props.count / 3 )) * 169)
)}px;
@media (max-width: 800px) {
height:${(props: DragImg) => (((props.count % 2) ? (Math.ceil (props.count / 2)) : (props.count / 2)) * 169)
}px;
}
}
.grid-item {
border-radius: 10px;
position: relative;
width : 100%;
height : 100%;
background-size : cover;
background-position : center;
>svg{
position : absolute;
right :-6px;
top :-6px;
color : white;
cursor : pointer;
z-index : 1;
background-color : black;
color : white;
padding : 3px;
font-size :1.3rem;
border-radius : 50%;
}
`