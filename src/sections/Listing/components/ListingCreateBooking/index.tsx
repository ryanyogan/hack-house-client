import { Button, Card, DatePicker, Divider, Typography } from "antd";
import moment, { Moment } from "moment";
import React from "react";
import { displayErrorMessage, formatListingPrice } from "../../../../lib/utils";

const { Paragraph, Title } = Typography;

interface Props {
  price: number;
  checkInDate: Moment | null;
  checkOutDate: Moment | null;
  setCheckInDate: (checkInDate: Moment | null) => void;
  setCheckOutDate: (checkOutDate: Moment | null) => void;
}

export const ListingCreateBooking = ({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: Props) => {
  const disabledDate = (currentDate: Moment | null) => {
    if (currentDate) {
      const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf("day"));
      return dateIsBeforeEndOfDay;
    } else {
      return false;
    }
  };

  const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
        return displayErrorMessage(
          `You can't book a check out date prior to your check in date!`
        );
      }
    }

    setCheckOutDate(selectedCheckOutDate);
  };

  const checkOutInputDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;

  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              onChange={(dateValue) => setCheckInDate(dateValue)}
              onOpenChange={() => setCheckOutDate(null)}
              format={"MM/DD/YYYY"}
              disabledDate={disabledDate}
              showToday={false}
              value={checkInDate ? checkInDate : undefined}
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              onChange={(dateValue) => verifyAndSetCheckOutDate(dateValue)}
              format={"MM/DD/YYYY"}
              disabledDate={disabledDate}
              showToday={false}
              disabled={checkOutInputDisabled}
              value={checkOutDate ? checkOutDate : undefined}
            />
          </div>
        </div>
        <Divider />
        <Button
          size="large"
          type="primary"
          className="listing-booking__card-cta"
          disabled={buttonDisabled}
        >
          Request to book!
        </Button>
      </Card>
    </div>
  );
};
