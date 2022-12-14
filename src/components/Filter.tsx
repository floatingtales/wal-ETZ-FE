import { DateTime } from "luxon";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { filterPropInterface } from "../types/propInterface";
import colorList from "../constants/colorList";

export default function Filter(props: filterPropInterface) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { filters, setFilters } = props;

  const initialDateConfig = {
    startDate: filters.startDate,
    endDate: filters.endDate,
  };

  const [dateConfig, setDateConfig] = useState(initialDateConfig);
  const [viewExpenseConfig, setViewExpenseConfig] = useState(false);
  const [viewIncomeConfig, setViewIncomeConfig] = useState(false);
  const [dateQuickSelection, setDateQuickSelection] = useState<string | number>(
    -1
  );

  const handleQuickSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDateRange = e.target.value;
    setDateQuickSelection(selectedDateRange);
    const currentDate = DateTime.now();
    switch (selectedDateRange) {
      case "currentWeek":
        setDateConfig({
          startDate: currentDate.startOf("week").toISODate(),
          endDate: currentDate.endOf("week").toISODate(),
        });
        break;
      case "lastWeek":
        setDateConfig({
          startDate: currentDate.minus({ week: 1 }).startOf("week").toISODate(),
          endDate: currentDate.minus({ week: 1 }).endOf("week").toISODate(),
        });
        break;
      case "currentMonth":
        setDateConfig({
          startDate: currentDate.startOf("month").toISODate(),
          endDate: currentDate.endOf("month").toISODate(),
        });
        break;
      case "lastMonth":
        setDateConfig({
          startDate: currentDate
            .minus({ month: 1 })
            .startOf("month")
            .toISODate(),
          endDate: currentDate.minus({ month: 1 }).endOf("month").toISODate(),
        });
        break;
      case "currentYear":
        setDateConfig({
          startDate: currentDate.startOf("year").toISODate(),
          endDate: currentDate.endOf("year").toISODate(),
        });
        break;
      case "lastYear":
        setDateConfig({
          startDate: currentDate.minus({ year: 1 }).startOf("year").toISODate(),
          endDate: currentDate.minus({ year: 1 }).endOf("year").toISODate(),
        });
        break;
      default:
        break;
    }
  };

  const handleStartDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateQuickSelection(-1);
    const newStartDate = e.target.value;
    if (DateTime.fromISO(newStartDate) > DateTime.fromISO(dateConfig.endDate)) {
      setDateConfig({ startDate: newStartDate, endDate: newStartDate });
    } else {
      setDateConfig({ ...dateConfig, startDate: newStartDate });
    }
  };

  const handleEndDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateQuickSelection(-1);
    const newEndDate = e.target.value;
    if (DateTime.fromISO(newEndDate) < DateTime.fromISO(dateConfig.startDate)) {
      setDateConfig({ startDate: newEndDate, endDate: newEndDate });
    } else {
      setDateConfig({ ...dateConfig, endDate: newEndDate });
    }
  };

  const handleViewExpenseSwitch = () => {
    setViewExpenseConfig(!viewExpenseConfig);
  };

  const handleViewIncomeSwitch = () => {
    setViewIncomeConfig(!viewIncomeConfig);
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (filters.viewExpense !== undefined && filters.viewIncome !== undefined) {
      setFilters({
        ...filters,
        ...dateConfig,
        viewIncome: viewIncomeConfig,
        viewExpense: viewExpenseConfig,
      });
    } else {
      setFilters({ ...filters, ...dateConfig });
    }
    onClose();
  };

  return (
    <>
      <IconButton
        variant="ghost"
        onClick={onOpen}
        color={colorList.textColor}
        icon={<FaFilter />}
        aria-label="Record Filter"
      />

      <Modal
        closeOnEsc
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <form onSubmit={handleFormSubmit}>
          <ModalOverlay />
          <ModalContent bg={colorList.drawerModal}>
            <ModalHeader color={colorList.textColor}>
              Filter Settings
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <FormLabel color={colorList.textColor}>
                  Quick Date Select
                </FormLabel>
              </Center>
              <Select
                onChange={handleQuickSelect}
                placeholder="Quick Date Select"
                value={dateQuickSelection}
              >
                <option value="currentWeek">This Week</option>
                <option value="lastWeek">Last Week</option>
                <option value="currentMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="currentYear">This Year</option>
                <option value="lastYear">Last Year</option>
              </Select>
              <Flex>
                <Box w="49%" my={5} mr={1}>
                  <Center>
                    <FormLabel color={colorList.textColor}>
                      Start Date
                    </FormLabel>
                  </Center>
                  <Input
                    placeholder="Select Start Date"
                    size="md"
                    type="date"
                    value={dateConfig.startDate}
                    onChange={handleStartDateChange}
                  />
                </Box>
                <Box w="49%" my={5} ml={1}>
                  <Center>
                    <FormLabel color={colorList.textColor}>End Date</FormLabel>
                  </Center>
                  <Input
                    placeholder="Select End Date"
                    size="md"
                    type="date"
                    value={dateConfig.endDate}
                    onChange={handleEndDateChange}
                  />
                </Box>
              </Flex>
              <Flex>
                {filters.viewExpense !== undefined && (
                  <Box w="50%" my={2}>
                    <Center>
                      <FormLabel color={colorList.textColor}>
                        View Expense
                      </FormLabel>
                      <br />
                      <Switch
                        isChecked={viewExpenseConfig}
                        onChange={handleViewExpenseSwitch}
                        isDisabled={viewIncomeConfig}
                      />
                    </Center>
                  </Box>
                )}
                {filters.viewIncome !== undefined && (
                  <Box w="50%" my={2}>
                    <Center>
                      <FormLabel color={colorList.textColor}>
                        View Income
                      </FormLabel>
                      <br />
                      <Switch
                        isChecked={viewIncomeConfig}
                        onChange={handleViewIncomeSwitch}
                        isDisabled={viewExpenseConfig}
                      />
                    </Center>
                  </Box>
                )}
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                bg={colorList.buttonPrimary}
                color={colorList.drawerModal}
                _hover={{
                  bg: colorList.component,
                  color: colorList.textColor,
                }}
                _active={{
                  bg: colorList.buttonSecondary,
                  color: colorList.textColor,
                }}
                mr={3}
                type="submit"
              >
                Filter Records
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
