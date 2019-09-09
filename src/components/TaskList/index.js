import React from "react";
import { withFirebase } from "../Auth/Firebase";
import styled from "styled-components";
import { DeleteIcon, EditIcon } from "shared/Icons";
import formateDate from "utils";
const TodoFormModal = React.lazy(() => import("../TodoForm"));
const ListLayout = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ListContainer = styled.div`
  width: 50%;
  height: 150px;
  background: #fff;
  box-sizing: border-box;
  font-size: 12px;
  margin: 5px 0 10px;
  color: rgba(65, 65, 65, 0.8);
  box-shadow: inset 0 1px 0 #e9eef2;
  border: ${props => {
    switch (props.activeStatus) {
      case "Active":
        return "1px solid #adb9c5";
      case "Completed":
        return "1px solid #00a991";
      default:
        return "1px solid #00a991";
    }
  }};
`;

const HeaderSection = styled.div`
  width: 100%;
  position: relative;
  height: 25%;
  display: flex;
  align-items: center;
  background: #f2f2f2;
`;

const FooterSection = styled.div`
  width: 100%;
  position: relative;
  height: 25%;
  display: flex;
  align-items: center;
  border-top: 1px solid #f2f2f2;
`;
const MainSection = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
`;

const TitleText = styled.div`
  font-size: 18px;
  font-weight: 600;
  width: 40%;
  padding: 10px;
`;

const ContentText = styled.div`
  font-size: 12px;
  font-weight: 600;
  padding: 10px;
`;

const EditSection = styled.div`
  font-size: 12px;
  display: flex;
  cursor: pointer;
  align-items: center;
`;

const TaskTypeContainer = styled.div`
  font-size: 12px;
  width: 40%;
  color: #fff;
  display: flex;
`;
const TextView = styled.span`
  font-size: 14px;
  padding: 0 5px;
`;
const TaskType = styled.div`
  padding: 0.3rem 0.5rem;
  border-radius: 1.5rem;
  color: #fff;
  background: ${props => {
    switch (props.statusTask) {
      case "Frontend":
        return "#50e3a4";
      case "Backend":
        return "red";
      case "Mobile":
        return "blue";
      case "Server":
        return "green";
      default:
        return "gray";
    }
  }};
`;

const EditIconWrapper = styled.div`
  padding: 0.3rem 0.5rem;
  background: gray;
  display: flex;
  right: 1%;
  border-radius: 2px;
  padding: 3px;
  cursor: pointer;
  background: #f2f2f2;
  justify-content: center;
  &:hover {
    background: rgba(128, 128, 128, 0.7);
    color: #fff;
  }
`;

const DateSection = styled.div`
  display: flex;
  border-radius: 2px;
  padding: 3px;
  width: 40%;
  cursor: pointer;
  background: #f2f2f2;
  justify-content: center;
`;
const EditLayout = styled.div`
  display: flex;
  border-radius: 2px;
  padding: 3px;
  width: 30%;
`;

const DeleteIconWrapper = styled.div`
  position: absolute;
  border-radius: 50%;
  display: flex;
  right: 1%;
  cursor: pointer;
  padding: 2px;
  background: #f2f2f2;
  justify-content: center;
  &:hover {
    background: rgba(128, 128, 128, 0.7);
  }
`;

const StatusWrapper = styled.div`
  position: absolute;
  border-radius: 4px;
  display: flex;
  right: 1%;
  cursor: pointer;
  padding: 5px;
  background: ${props => {
    switch (props.statusTask) {
      case "Active":
        return "rgba(128, 128, 128, 0.7)";
      case "Completed":
        return "green";

      default:
        return "rgba(128, 128, 128, 0.7)ay";
    }
  }};
  justify-content: center;
  color: #fff;
  &:hover {
    background: ;
  }
`;

const TaskList = props => {
  const { taskListDetails } = props;
  const [isModal, isModalSet] = React.useState(false);
  const [istaskList, setTaskList] = React.useState();
  function toggleStatusModal() {
    isModalSet(!isModal);
  }
  function deleteTask(tid) {
    props.reqDeleteTask(props.firebase, tid);
  }

  function changeStatus(status, id) {
    var updatedStatus = "";
    if (status === "Active") {
      updatedStatus = "Completed";
    } else {
      updatedStatus = "Active";
    }
    props.reqChangedStatus(
      updatedStatus,
      props.taskListDetails[id].taskType.taskType,
      props.taskListDetails[id].taskType.title,
      props.taskListDetails[id].taskType.details,
      props.taskListDetails[id].taskType.dueDate,
      id,
      props.firebase
    );
  }

  function updateTask(value) {
    setTaskList(value);
    toggleStatusModal();
  }
  function renderedList() {
    if (taskListDetails) {
      return Object.keys(taskListDetails).map(value => {
        return (
          <ListContainer
            activeStatus={taskListDetails[value].taskType.statusTask}
            key={value}
          >
            <HeaderSection>
              <TitleText>{taskListDetails[value].taskType.title}</TitleText>
              <TaskTypeContainer>
                <TaskType statusTask={taskListDetails[value].taskType.taskType}>
                  {taskListDetails[value].taskType.taskType} task
                </TaskType>
              </TaskTypeContainer>
              <DeleteIconWrapper>
                <DeleteIcon onClick={() => deleteTask(value)}></DeleteIcon>
              </DeleteIconWrapper>
            </HeaderSection>
            <MainSection>
              <ContentText>
                {taskListDetails[value].taskType.details}
              </ContentText>
            </MainSection>
            <FooterSection>
              <EditLayout>
                <EditSection onClick={() => updateTask(value)}>
                  <TextView>Edit</TextView>
                  <EditIconWrapper>
                    <EditIcon size={16}></EditIcon>
                  </EditIconWrapper>
                </EditSection>
              </EditLayout>
              <DateSection>
                <TextView>Due date:</TextView>
                <TextView>
                  {formateDate(
                    new Date(taskListDetails[value].taskType.dueDate)
                  )}
                </TextView>
              </DateSection>
              <StatusWrapper
                onClick={() =>
                  changeStatus(
                    taskListDetails[value].taskType.statusTask,
                    value
                  )
                }
                statusTask={taskListDetails[value].taskType.statusTask}
              >
                {taskListDetails[value].taskType.statusTask}
              </StatusWrapper>
            </FooterSection>
          </ListContainer>
        );
      });
    }
  }

  return (
    <ListLayout>
      {renderedList()}
      {isModal && (
        <TodoFormModal
          id="modal"
          listItem={istaskList}
          isModalOpen={isModal}
          onClose={toggleStatusModal}
          modalSize="md"
          {...props}
        />
      )}
    </ListLayout>
  );
};

export default withFirebase(TaskList);
