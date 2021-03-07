import React from "react";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import img from "../ui/icons/UBER-PREDATOR.png";
import alfa from "../ui/icons/alfapredator.png";

const UberBackground = styled(Box)`
  background-color: #323232;
  background-image: url(${img});
  background-size: 500px 150px;
  background-repeat: no-repeat;
  background-position: right;
  width: 850px;
  height: 150px;
  margin-bottom: 10px;
`;

const StyledAvatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;
export const UberPredator = () => {
  return (
    <Box display="flex" justifyContent="center">
      <UberBackground>
        <Box
          display="flex"
          marginLeft="10px"
          height="150px"
          alignItems="center"
        >
          <StyledAvatar src={alfa} alt="asd" />
          <Box marginLeft="10px">
            <Box display="flex" fontSize="24px" color="white">
              MAXIM 'D`ED' ANANIN
            </Box>
            <Box
              display="flex"
              fontWeight="700"
              color="#F51010"
              fontSize="24px"
            >
              OVER 900000 pts
            </Box>
          </Box>
        </Box>
      </UberBackground>
    </Box>
  );
};
