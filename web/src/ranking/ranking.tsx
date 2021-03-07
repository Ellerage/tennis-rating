import React from "react";
import { Box } from "@material-ui/core";
import { Header } from "../ui/header";
import { NewGame } from "../ui/new-game";
import { RankingTable } from "./rangking-table";
import { UberPredator } from "./uber-predator";
export const Ranking = () => {
  return (
    <Box>
      <Header />
      <Box
        display="flex"
        height="65px"
        bgcolor="#323232"
        margin="10px 0"
        color="white"
        alignItems="center"
      >
        UBER RANKING
      </Box>
      <UberPredator />
      <Box display="flex" justifyContent="center" marginBottom="10px">
        <NewGame />
      </Box>
      <RankingTable />
    </Box>
  );
};
