import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activityStore"

const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{ marginRight: "1rem" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={activityStore.openCreateForm} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar)
