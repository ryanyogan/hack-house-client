import { Avatar, Button, Card, Divider, Typography } from "antd";
import React, { Fragment } from "react";
import { User as UserData } from "../../../../lib/graphql/queries/User/__generated__/User";

interface Props {
  user: UserData["user"];
  viewerIsUser: boolean;
}

const { Paragraph, Text, Title } = Typography;

const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&scope=read_write`;

export const UserProfile = ({ user, viewerIsUser }: Props) => {
  const redirectToStripe = () => {
    window.location.href = stripeAuthUrl;
  };

  const additionalDetailsSection = viewerIsUser ? (
    <Fragment>
      <Divider />
      <div className="user-profile__details">
        <Title level={4}>Additional Details</Title>
        <Paragraph>
          Interested in becoming a HackHouse host? Register with your Stripe
          account!
        </Paragraph>
        <Button
          type="primary"
          onClick={redirectToStripe}
          className="user-profile__details-cta"
        >
          Connect with Stripe!
        </Button>
        <Paragraph type="secondary">
          HackHouse uses{" "}
          <a
            href="https://stripe.com/en-US/connect"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe
          </a>{" "}
          to help transfer your earnings in a secure, industry-standard, and
          trusted manner.
        </Paragraph>
      </div>
    </Fragment>
  ) : null;

  return (
    <div className="user-profile">
      <Card className="user-profile__card">
        <div className="user-profile__avatar">
          <Avatar size={100} src={user.avatar} />
        </div>
        <Divider />
        <div className="user-profile__details">
          <Title level={4}>Details</Title>
          <Paragraph>
            Name: <Text strong>{user.name}</Text>
          </Paragraph>
          <Paragraph>
            Contact: <Text strong>{user.contact}</Text>
          </Paragraph>
        </div>
        {additionalDetailsSection}
      </Card>
    </div>
  );
};
