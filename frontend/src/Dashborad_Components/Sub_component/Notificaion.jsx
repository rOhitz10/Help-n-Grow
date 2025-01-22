import React from "react";
import { AiOutlineDownload } from 'react-icons/ai'; // Assuming you have icons installed

const notifications = [
  {
    id: 1,
    user: "Dash",
    action: "asked to join",
    project: "Ease Design System",
    fileName: "Ease Design System.fig",
    timeAgo: "1 hour ago",
    edited: "Edited 12 mins ago",
    status: "pending",
  },
  {
    id: 2,
    user: "Anton",
    action: "mentioned you",
    project: "Ease v8 Master",
    message:
      "Give feedback, ask a question, or just leave a note of appreciation. 😊",
    timeAgo: "8 hours ago",
    status: "read",
  },
  {
    id: 3,
    user: "Anna",
    action: "uploaded 2 new files",
    project: "Moyo Production",
    fileName: "Undesign_Userflow.kit",
    fileSize: "2.85 GB",
    uploadedAgo: "30 mins ago",
    date: "Feb 24",
    status: "download",
  },
  
 {
   id: 2,
   user: "Anton",
   action: "mentioned you",
   project: "Ease v8 Master",
   message:
     "Give feedback, ask a question, or just leave a note of appreciation. 😊",
   timeAgo: "8 hours ago",
   status: "read",
 },
 {
   id: 3,
   user: "Anna",
   action: "uploaded 2 new files",
   project: "Moyo Production",
   fileName: "Undesign_Userflow.kit",
   fileSize: "2.85 GB",
   uploadedAgo: "30 mins ago",
   date: "Feb 24",
   // status: "download",
 },
 {
  id: 2,
  user: "Anton",
  action: "mentioned you",
  project: "Ease v8 Master",
  message:
    "Give feedback, ask a question, or just leave a note of appreciation. 😊",
  timeAgo: "8 hours ago",
  status: "read",
},
{
  id: 3,
  user: "Anna",
  action: "uploaded 2 new files",
  project: "Moyo Production",
  fileName: "Undesign_Userflow.kit",
  fileSize: "2.85 GB",
  uploadedAgo: "30 mins ago",
  date: "Feb 24",
  // status: "download",
},
{
 id: 2,
 user: "Anton",
 action: "mentioned you",
 project: "Ease v8 Master",
 message:
   "Give feedback, ask a question, or just leave a note of appreciation. 😊",
 timeAgo: "8 hours ago",
 status: "read",
},
{
 id: 3,
 user: "Anna",
 action: "uploaded 2 new files",
 project: "Moyo Production",
 fileName: "Undesign_Userflow.kit",
 fileSize: "2.85 GB",
 uploadedAgo: "30 mins ago",
 date: "Feb 24",
 // status: "download",
},
  
];

function NotificationItem({ notification }) {
  return (
    <div className="notification-item p-4 mb-4 rounded-lg bg-gray-700 hover:bg-gray-600">
      <div className="flex justify-between items-center ">
        <div>
          <strong>{notification.user}</strong> {notification.action}{" "}
          <strong>{notification.project}</strong>
        </div>
        <div className="text-sm text-gray-400">{notification.timeAgo || notification.date}</div>
      </div>

      {notification.fileName && (
        <div className="file-info mt-2 text-sm text-gray-300">
          <span>{notification.fileName}</span>
          {notification.edited && <small className="ml-2">{notification.edited}</small>}
          {notification.fileSize && <small className="ml-2">{notification.fileSize}</small>}
        </div>
      )}

      {notification.message && (
        <div className="message mt-2 text-sm text-gray-300">{notification.message}</div>
      )}

      {notification.status === "pending" && (
        <div className="actions mt-3 flex gap-3">
          <button className="btn-decline bg-red-600 text-white p-2 rounded hover:bg-red-500 transition duration-200">
            Decline
          </button>
          <button className="btn-approve bg-green-600 text-white p-2 rounded hover:bg-green-500 transition duration-200">
            Approve
          </button>
        </div>
      )}

      {notification.status === "download" && (
        <div className="actions mt-3">
          <button className="btn-download bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition duration-200">
            <AiOutlineDownload className="inline-block mr-2" />
            Download
          </button>
        </div>
      )}
    </div>
  );
}

export default function Notifications() {
  return (
    <div className="notifications-container text-white p-6 bg-gray-800 rounded-xl w-96 max-w-4xl mx-auto">
      <div className="header flex justify-between items-center border-b-2 pb-3 mb-4">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <button className="text-sm text-blue-400 hover:text-blue-300">Mark all as read</button>
      </div>

      <div className="tabs flex gap-4 mb-6">
        <button className="tab bg-gray-700 p-2 px-6 rounded-xl hover:bg-gray-600 transition duration-200">Inbox</button>
        <button className="tab bg-gray-700 p-2 px-6 rounded-xl hover:bg-gray-600 transition duration-200">Team</button>
      </div>

      <div className="notifications-list grid gap-4 scrollbar-y ">
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} notification={notif} />
        ))}
      </div>
    </div>
  );
}
