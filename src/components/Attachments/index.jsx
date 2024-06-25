import { Card } from "antd";
import { UploaderInputs } from "..";
import { Link } from "react-router-dom";

const { Meta } = Card;

export default function Attachments() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card
          hoverable
          cover={
            <Link to="/test.jpeg" target="_blank">
              <img alt="example" src="/test.jpeg" className="h-40 w-full" />
            </Link>
          }
        >
          <p className="text-xs">IMG_20240619_180254.jpg</p>
          <p className="text-xs text-gray-500">686.11 KB, 5 days ago</p>
        </Card>
        <Card
          hoverable
          cover={
            <Link to="/test.jpeg" target="_blank">
              <img alt="example" src="/test.jpeg" className="h-40 w-full" />
            </Link>
          }
        >
          <p className="text-xs">IMG_20240619_180254.jpg</p>
          <p className="text-xs text-gray-500">686.11 KB, 5 days ago</p>
        </Card>
        <Card
          hoverable
          cover={
            <Link to="/test.jpeg" target="_blank">
              <img alt="example" src="/test.jpeg" className="h-40 w-full" />
            </Link>
          }
        >
          <p className="text-xs">IMG_20240619_180254.jpg</p>
          <p className="text-xs text-gray-500">686.11 KB, 5 days ago</p>
        </Card>
        <Card
          hoverable
          cover={
            <Link to="/test.jpeg" target="_blank">
              <img alt="example" src="/test.jpeg" className="h-40 w-full" />
            </Link>
          }
        >
          <p className="text-xs">IMG_20240619_180254.jpg</p>
          <p className="text-xs text-gray-500">686.11 KB, 5 days ago</p>
        </Card>
      </div>
      <UploaderInputs />
    </>
  );
}
