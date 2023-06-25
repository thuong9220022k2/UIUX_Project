import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCheckPoint, getTagsList } from "../../../../Redux/AppContext/actions";
import { useHistory } from "react-router-dom";
import { LpCreateTask } from "./LpCreateTask";

const LpSidebar = () => {
  const dispatch = useDispatch();
  const tagLists = useSelector((store) => store.AppReducer.tags);
  const tasks = useSelector((store) => store.AppReducer.tasks);
        const [selectTags, setSelectTags] = useState([]);
        const history = useHistory();
        useEffect(() => {
          const params = new URLSearchParams(window.location.search);
          const tags = params.getAll('tags');
          setSelectTags(tags || []);
        }, []);
      
        const handleTagChange = (value) => {
          let newTags = [...selectTags];
          if (selectTags.includes(value)) {
            newTags = newTags.filter((tag) => tag !== value);
          } else {
            newTags.push(value);
          }
          setSelectTags(newTags);
      
          const params = new URLSearchParams(window.location.search);
          params.delete('tags');
          newTags.forEach((tag) => params.append('tags', tag));
      
          const newUrl = `${window.location.pathname}?${params.toString()}`;
          window.location.href = newUrl;
          history.push(newUrl);
        };
        
        
  const { isOpen, onOpen, onClose } = useDisclosure();
  const checkPoints = useSelector((store) => store.AppReducer.checkPoint);

  useEffect(() => {
    if (checkPoints.length === 0) {
      dispatch(getCheckPoint());
    }
  }, [dispatch, checkPoints.length]);

  useEffect(() => {
    if (tagLists.length === 0) {
      dispatch(getTagsList());
    }
  }, [dispatch, tagLists.length]);

  return (
    <Box
      width={{ base: "90%", sm: "80%", md: "25%", lg: "25%", xl: "25%" }}
      height="auto"
      marginBottom="1rem"
    >
          <Flex width={{ base: "90%", sm: "80%", md: "25%", lg: "25%", xl: "25%" }} gap="15px">
            <Box  width="auto">
              <Box>
                <Button
                  backgroundColor="#422AFB"
                  _hover={{ color: "black", backgroundColor: "gray.100" }}
                  color="white"
                  onClick={onOpen}
                >
                  Create new Task
                </Button>
              </Box>
              <LpCreateTask isOpen={isOpen} onClose={onClose} />
            </Box>
            {tagLists.length > 0 &&
              tagLists.map((item) => {
                return (
                  <Box
                    cursor="pointer"
                    width="auto"
                    key={item.id}
                    borderRadius="5px"
                    onClick={() => {
                      handleTagChange(item.tag);
                    }}
                    backgroundColor={
                      selectTags.includes(item.tag) ? "red.300" : "red.100"
                    }
                    color={selectTags.includes(item.tag) ? "white" : "black"}
                  >
                    <Flex>
                    <Box>
                        <Button
                          backgroundColor="#422AFB"
                          _hover={{ color: "black", backgroundColor: "gray.100" }}
                          color="white"
                        >
                            {item.tag}
                        </Button>
                    </Box>
                    </Flex>
                  </Box>
                );
              })}
          </Flex>
    </Box>
  );
};

export default LpSidebar;
