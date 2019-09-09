import React from "react";
import { withAuthorization, withEmailVerification } from "../Auth/Session";
import { withFirebase } from "../Auth/Firebase";
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  createNewTask,
  getTaskDetails,
  reqUpdateTask,
  reqDeleteTask,
  reqChangedStatus
} from "redux/actions";
import TaskList from "../TaskList";
import styled from "styled-components";
import TodoFormModal from "../TodoForm";
const Header = React.lazy(() => import("../Header"));

const HomePageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: #f0efe9;
  flex-direction: column;
`;

const NewTaskSection = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  border-top: 1px solid #f2f2f2;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #fff;
`;

const HomePageMain = styled.div`
  width: 100%;
  height: calc(100vh - 18%);
  display: flex;
  overflow-y: auto;
  padding: 15px;
  align-items: center;
  flex-direction: column;
`;

const CreateButton = styled.button`
  color: gray;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  width: 100px;
  border-radius: 2px;
  margin: 10px;
  border: 1px solid rgba(3, 168, 124, 1);
  justify-content: center;
  padding: 8px;
  &:hover {
    background: rgba(3, 168, 124, 1);
    color: #fff;
  }
  ::placeholder {
    color: #f2f2f2;
  }
`;

const HomePage = props => {
  const [isModal, isModalSet] = React.useState(false);
  React.useEffect(() => {
    props.getTaskDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function toggleStatusModal() {
    isModalSet(!isModal);
  }

  return (
    <React.Fragment>
      <HomePageContainer>
        <Header />
        <NewTaskSection>
          <CreateButton onClick={toggleStatusModal}>New Task</CreateButton>
        </NewTaskSection>
        <HomePageMain>
          <TaskList {...props}></TaskList>
        </HomePageMain>
      </HomePageContainer>
      {isModal && (
        <TodoFormModal
          id="modal"
          listItem={null}
          isModalOpen={isModal}
          onClose={toggleStatusModal}
          modalSize="md"
          {...props}
        />
      )}
    </React.Fragment>
  );
};
const condition = authUser => !!authUser;
const mapStateToProps = state => {
  return {
    taskListDetails: state.task.taskListDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewTask: (...args) => dispatch(createNewTask(...args)),
    getTaskDetails: (...args) => dispatch(getTaskDetails(...args)),
    reqUpdateTask: (...args) => dispatch(reqUpdateTask(...args)),
    reqDeleteTask: (...args) => dispatch(reqDeleteTask(...args)),
    reqChangedStatus: (...args) => dispatch(reqChangedStatus(...args))
  };
};

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomePage);
