import React from "react";
import { Placeholder, Card } from "semantic-ui-react";

const CustomPlaceholder = () => {
  return (
    <Card>
      <Placeholder>
        <Placeholder.Image square />
      </Placeholder>
      <Card.Content>
        <Placeholder>
          <Placeholder.Line length="short" />
        </Placeholder>
        <Card.Meta>
          <Placeholder>
            <Placeholder.Line length="medium" />
          </Placeholder>
        </Card.Meta>
        <Card.Description>
          <Placeholder>
            <Placeholder.Line length="very short" />
          </Placeholder>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default CustomPlaceholder;
