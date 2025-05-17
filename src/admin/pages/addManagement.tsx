import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Grid2, TablePagination } from "@mui/material";
import { SortIcon } from "assets/imageSvg/sortIcon";
//Icons
import { Add, ModeEdit } from "@mui/icons-material";
// components
import { SectionHeader } from "admin/Navigation/Header/SectionHeader";
import { OutlinedButton } from "../../Components/Buttons/Button";
// Api
import { useQuery } from "@apollo/client";
import { GET_ALL_ADS } from "apollo/query";

export function AdManagement() {
     const [variables, setVariables] = useState<any>({
        orderBy: { field: "likes", order: 1 },
        limit: 5,
        skip: 0,
      });
      const [apiDataCount, setApiDataCount] = useState(0);
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [totalCount, setTotalCount] = useState(0);
      const navigate = useNavigate();
      const [rows, setRows] = useState<any>();
      const { data, loading, error, refetch } = useQuery(GET_ALL_ADS, {
        variables,
      });
      useEffect(() => {
        console.log("dataaaa",data);
        if (data) {
          setRows(data.getAllAd.response);
        //   setTotalCount(data.getAllAd.count);
        setTotalCount(5)
        }
      }, [data]);
      useEffect(() => {
        refetch()
      })
      const sort = (type: string) => {
        setVariables((prev: any) => ({
          ...prev,
          limit: 20, // Example: Change limit to 20
          orderBy: { field: type, order: variables.orderBy.field === type ? (variables.orderBy.order === 1 ? -1 : 1) : -1 }, // Example: Change sorting
        }));
    
        // Trigger refetch with the updated variables
        refetch();
      };
      function handleEditClick(id: any): void {
        navigate(`/admin/addAdvertisment/${id}`); // Navigate to the addlisting page with ID
      }
      const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        // setPage(0);
        setVariables((prev: any) => ({ ...prev, limit: parseInt(event.target.value) }));
        refetch();
      };
      const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
        setVariables((prev: any) => ({ ...prev, skip: newPage }));
        refetch();
    
        setPage(newPage);
      };
      const handleTotalCountChange = (event: any) => {
        const changes = {
          orderBy: { field: "likes", order: 1 },
          limit: 10,
          skip: 0,
        };
        setVariables((prev: any) => ({ ...prev, limit: parseInt(event.target.value) }));
        refetch();
    
        setTotalCount(parseInt(event.target.value, 10));
        // Logic to fetch data with the new total count can be added here
      };
      const handleAddFields = () => {
        navigate("/admin/addAdvertisment");
      };
return(
    <Container className="admin-Content-view" maxWidth="xl">
    <div className="flex justify-between items-center w-full">
      <SectionHeader title="Ads Management" />
      <OutlinedButton propoerty={{ isStartIcon : <Add /> }} name="Add Ads" handleClick={handleAddFields} />
    </div>
    <div className="flex flex-col space-y-2">
      <TableContainer style={{ boxShadow: "none" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell  align="center" onClick={() => sort("_id")}>
                <strong style={{ display: "flex" }}>
                  ID <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                </strong>
              </TableCell>
              <TableCell align="center" onClick={() => sort("imageUrl")}>
                <strong style={{ display: "flex" }}>
                Image Url <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                </strong>
              </TableCell>
              <TableCell align="center" onClick={() => sort("status")}>
                <strong style={{ display: "flex" }}>
                Status <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                </strong>
              </TableCell>
              {/* <TableCell align="center" onClick={() => sort("Sold Out Count")}>
                <strong style={{ display: "flex" }}>
                  Sold Out Count <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                </strong>
              </TableCell>
              <TableCell align="center" onClick={() => sort("Total Available Count")}>
                <strong style={{ display: "flex" }}>
                  Total Available Count <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                </strong>
              </TableCell> */}

              {/* <TableCell align="center"><strong>Likes</strong></TableCell>
          <TableCell align="center"><strong>Sold Out Count</strong></TableCell>*/}
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row: any, index: number) => (
              <TableRow key={index}>
                {/* <TableCell>{row.title}</TableCell> */}
                <TableCell >{row._id || "N/A"}</TableCell>
                <TableCell >{row.imageUrl}</TableCell>
                <TableCell >{row.status}</TableCell>
                {/* <TableCell >{row.total_available_count}</TableCell> */}
                <TableCell  align="center"  style={{ width: "150px", minWidth: "150px", cursor: "pointer" }} onClick={() => handleEditClick(row._id)}>
                  <ModeEdit />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10, 20, 30, 50]} component="div" count={totalCount} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </div>
  </Container>
)
}