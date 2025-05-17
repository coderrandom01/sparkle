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
import { GET_ALL_LISTINGS } from "apollo/query";
import { ToggleField } from "admin/fieldInputs/toggleField";

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function ManageListings() {
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
  const { data, loading, error, refetch } = useQuery(GET_ALL_LISTINGS, {
    variables,
  });
  useEffect(() => {
    refetch();
  },[])
  useEffect(() => {
    if (data?.getAllProductAdminTable) {
      setRows(data.getAllProductAdminTable.responce);
      setTotalCount(data.getAllProductAdminTable.count);
    }
  }, [data]);
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
    navigate(`/admin/addlisting/${id}`); // Navigate to the addlisting page with ID
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
    navigate("/admin/addlisting");
  };
  const navigateToListings = (id : string) => {
    navigate(`/productDetails/${id}`)
  }
  return (
    <Container className="admin-Content-view" maxWidth="xl">
      <div className="flex justify-between items-center w-full">
        <SectionHeader title="Listing Management" />
        <OutlinedButton propoerty={{ isStartIcon : <Add /> }} name="Add Listing" handleClick={handleAddFields} />
      </div>
      <div className="flex flex-col space-y-2">
        <TableContainer style={{ boxShadow: "none" }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => sort("title")}>
                  <strong style={{ display: "flex" }}>
                    Title <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                  </strong>
                </TableCell>
                <TableCell align="center" onClick={() => sort("category_name")}>
                  <strong style={{ display: "flex" }}>
                    Category Name <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                  </strong>
                </TableCell>
                <TableCell align="center" onClick={() => sort("explore_products")}>
                  <strong style={{ display: "flex" }}>
                  Explore Products <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                  </strong>
                </TableCell>
                <TableCell align="center" onClick={() => sort("new_arrivals")}>
                  <strong style={{ display: "flex" }}>
                  New Arrivals <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                  </strong>
                </TableCell>
                <TableCell align="center" onClick={() => sort("top_selling_products")}>
                  <strong style={{ display: "flex" }}>
                  Top Selling Products <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                  </strong>
                </TableCell>
                <TableCell align="center" onClick={() => sort("clearance_sale")}>
                  <strong style={{ display: "flex" }}>
                  Clearance Sale <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                  </strong>
                </TableCell>
                <TableCell align="center" onClick={() => sort("Total Available Count")}>
                  <strong style={{ display: "flex" }}>
                    Total Available Count <span style={{ marginTop: "5px", marginLeft: "5px" }}>{SortIcon}</span>
                  </strong>
                </TableCell>

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
                  <TableCell onClick={() => navigateToListings(row._id)} ><p className="font-semibold cursor-pointer">
                  {row.title}</p></TableCell>
                  <TableCell align="center">{row.category_name || "N/A"}</TableCell>
                  <TableCell align="center" className=""> <ToggleField
                                        isOn={row.explore_products} disable = {true}
                                      /></TableCell>
                                <TableCell align="center" className=""> <ToggleField
                                        isOn={row.new_arrivals} disable = {true}
                                      /></TableCell> 
                                      <TableCell align="center" className=""> <ToggleField
                                        isOn={row.top_selling_products} disable = {true}
                                      /></TableCell>
                                      <TableCell align="center" className=""> <ToggleField
                                        isOn={row.clearance_sale} disable = {true}
                                      /></TableCell>            
                  {/* <TableCell align="center">{row.sold_out_count}</TableCell> */}
                  <TableCell align="center">{row.total_available_count}</TableCell>
                  <TableCell align="center" style={{ width: "150px", minWidth: "150px", cursor: "pointer" }} onClick={() => handleEditClick(row._id)}>
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
  );
}
