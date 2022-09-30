import axios from "axios";
import React, { useEffect, useState } from "react";
import { Order } from "../../components/Orders/Order";
import { useNav } from "../../hooks/useNav";

export const Orders = () => {
  const { goHome } = useNav();
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const userType = userLogged && userLogged.type ? userLogged.type : "";
  // const userType = "Admin";
  const [listOrder, setListOrder] = useState([]);

  const getAllOrders = async () => {
    try {
      const response = await axios.get("/orders");
      setListOrder(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    userType !== "Admin" && userType !== "User" && goHome();
    getAllOrders();
  }, []);

  return (
    <div className="flex flex-col items-center container m-auto my-10">
      {userType === "Admin" ? (
        <>
          <div
            className="w-[34rem] flex justify-between rounded-lg p-3 my-3"
            style={{ backgroundColor: "#ece9cd" }}
          >
            <div className="flex justify-center items-center w-96 pl-6">
              <p className="text-3x1 text-primary cursor-pointer"> USERS </p>
              <span
                className="text-2x1 material-icons text-primary cursor-pointer px-1"
                style={{ fontSize: "18px" }}
              >
                search
              </span>
            </div>

            <div className="flex justify-center items-center w-[20rem] text-primary">
              <p className="cursor-pointer">STATUS</p>
              <span
                className="text-2x1 material-icons text-primary cursor-pointer"
                style={{ fontSize: "24px" }}
              >
                keyboard_arrow_down
              </span>
            </div>
          </div>

          {listOrder ? (
            listOrder.map((item) => (
              <Order key={item.id} {...item} userType={userType} />
            ))
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {userType === "User" ? (
            <>
              <div
                className="w-[34rem] flex justify-between rounded-lg p-3 my-3"
                style={{ backgroundColor: "#ece9cd" }}
              >
                <div className="flex justify-center items-center w-96 pl-6">
                  <p className="text-3x1 text-primary cursor-pointer">USERS</p>
                </div>

                <div className="flex justify-center items-center w-[20rem] text-primary">
                  <p className="cursor-pointer">STATUS</p>
                </div>
              </div>

              {listOrder ? (
                listOrder.map((item) => (
                  <Order key={item.id} {...item} userType={userType} />
                ))
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};
