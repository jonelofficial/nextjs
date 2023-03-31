import Link from "next/link";
import classes from "./event-item.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import Image from "next/image";

const EventItem = ({ event }) => {
  return (
    <li className={classes.item}>
      <Image
        className={classes.img}
        src={"/" + event.image}
        alt={event.title}
        width={340}
        height={160}
      />
      {/* <img className={classes.img} src={"/" + event.image} alt={event.title} /> */}
      <div className={classes.content}>
        <h2>{event.title}</h2>

        <div className={classes.date}>
          <DateIcon />
          <time>
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{event.location.replace(", ", "\n")}</address>
        </div>

        <div className={classes.actions}>
          <Button link={`/events/${event.id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
