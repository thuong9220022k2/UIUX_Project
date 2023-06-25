import {
    Badge,
    Box,
    Flex,
    Text,
    Stack,
    CheckboxGroup,
    Checkbox,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTasks, getTasks, updateSubtasksList } from "../../../../Redux/AppContext/actions";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";


const LpTaskCard = ({ id, title, description, tags, Date, colorScheme }) => {

    const dispatch = useDispatch();
    const toast = useToast();

    const deleteTaskHandler = (id) => {
        dispatch(deleteTasks(id))
            .then(() => toast({
                title: 'Task deleted !',
                description: "We've deleted your task.",
                status: 'success',
                duration: 1500,
                position: "top",
                isClosable: true,
            }))
            .then(() => dispatch(getTasks()));
    };

    // const [checkBox, setCheckBox] = useState(() => {
    //     let data = subTasks.filter((item) => {
    //         return item.status && item.subTaskTitle;
    //     })
    //         .map((item) => item.subTaskTitle);
    //     return data;
    // });


    // const updateSubTaskStatus = (value) => {
    //     const newSubTaskData = subTasks.map((item) => {
    //         if (value.includes(item.subTaskTitle)) {
    //             return { ...item, status: true };
    //         }
    //         else {
    //             return { ...item, status: false };
    //         }
    //     });
    //     dispatch(updateSubtasksList(id, { subTasks: newSubTaskData }))
    //         .then(() => {
    //             dispatch(getTasks());
    //         });
    // };


    return (
        <Box
            width={{ base: "80%", sm: "90%", md: "90%", lg: "90%", xl: "90%" }}
            margin="auto"
            marginTop="3%"
            marginBottom="3%"
            borderRadius='lg'
            padding="5%"
            backgroundColor="white"
            boxShadow="rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
        >
            <Box>
                <Flex>
                    <Text mt='1'
                         fontWeight='semibold'
                         fontSize="20px"
                         as='h4'
                         lineHeight='tight'
                         noOfLines={1}>{title}
                    </Text>
                </Flex>
            </Box>
            <Box>
                <Stack
                    direction={{ base: "column", sm: "column", md: "column", lg: "row", xl: "row" }}
                    width="fit-content"
                >
                    {/* {tags.length && tags.map((item, index) => {
                        return <Badge fontWeight='bold' fontSize="12px" colorScheme={colorScheme} key={index}>{item}</Badge>
                    })} */}
                    <Badge fontWeight='bold' fontSize="12px" colorScheme={colorScheme}>{tags}</Badge>
                </Stack>
            </Box>
            <Box>
                <Flex>
                    <Text
                        fontWeight="500"
                        marginTop="3%"
                        marginBottom="3%"
                    >{description}</Text>
                </Flex>
            </Box>
            <Box>
                <Flex>
                    <Text
                        fontWeight="500"
                        marginTop="3%"
                        marginBottom="3%"
                    >{Date}
                    </Text>

                </Flex>
            </Box>
            <Box>
                <Flex
                    padding="4%"
                    paddingTop="7%"
                    justifyContent="space-between">
                    <Box color="blue">
                        <Link to={`/admin/list-task/${id}`}><EditIcon fontSize="100%" cursor="pointer" /></Link>
                    </Box>
                    <Box color="red">
                        <DeleteIcon fontSize="100%" onClick={() => deleteTaskHandler(id)} cursor="pointer" />
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export { LpTaskCard };
