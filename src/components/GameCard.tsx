import React from "react";
import "./GameCard.css";

export type DataProps = {
  id: string;
  scheduledTime: string;
  company: { id: string; name: string };
  users: {
    id: string;
    name: string;
    email: string;
  }[];
  status: string;
};

const GameCard: React.FC<DataProps> = ({
  id,
  scheduledTime,
  company,
  users,
  status,
}) => {

    const scdTime:Date = new Date(scheduledTime)

    return (
    <div className="card">
      <div className="card--grid">
        <div className="card--grid-status">
          <div className={`card--grid-status-${status}`}> </div>
        </div>
        <div className="card--grid-info">
          <span>{`#${id}`}</span>
          <span> {scdTime.toDateString()}, {scdTime.getHours()}:{scdTime.getMinutes()}</span>
          <span> {company.name}</span>
        </div>
        <div className="card--content">
          <div className="card--username">
            {users.map((user) => user.name).join(", ")}
          </div>
          <div className="card--status">{status}</div>{" "}
        </div>
      </div>
    </div>
  );
};
export default GameCard;
