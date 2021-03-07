import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import alfa from "../ui/icons/alfapredator.png";

import avatar from "../ui/icons/avatar.png";
const useStyles = makeStyles({
  table: {
    width: 850,
    background: "#323232",
    padding: "20px",
  },
});

function createData(
  name: string,
  pos: number,
  aka: string,
  pts: number,
  avatar: string
) {
  return { name, pos, aka, pts, avatar };
}
const testUser = {
  name: "ded",
  pos: 1,
  aka: "ded",
  pts: 9000,
  avatar: "",
};
const testData = [
  testUser,
  testUser,
  testUser,
  testUser,
  testUser,
  testUser,
  testUser,
  {
    name: "ded",
    pos: 1,
    aka: "ded",
    pts: 9000,
    avatar: alfa,
  },
];
const rows = testData.map((item) =>
  createData(
    item.name,
    item.pos,
    item.aka,
    item.pts,
    !!item.avatar ? item.avatar : avatar
  )
);
const StyledTableCell = styled(TableCell)`
  color: white;
  border-bottom: 1px solid #414141;
`;

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
export function RankingTable() {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Position</StyledTableCell>
            <StyledTableCell align="right">Aka</StyledTableCell>
            <StyledTableCell align="right">Pts</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <StyledTableCell align="left">
                <Box
                  borderRadius="50px"
                  width="50px"
                  height="50px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <StyledImg src={row.avatar} alt="avatar" />
                </Box>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>

              <StyledTableCell align="right">{row.pos}</StyledTableCell>
              <StyledTableCell align="right">{row.aka}</StyledTableCell>
              <StyledTableCell align="right">{row.pts}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
