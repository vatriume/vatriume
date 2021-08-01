import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

const UserInfo = () => {
    const firebase = useFirebase();
    const history = useHistory();
    const auth = useSelector((state) => state.firebase.auth);
    const profile = useSelector((state) => state.firebase.profile);

    const avatar = useSelector((state) => state.firebase.profile.avatarUrl);
    const username = useSelector((state) => state.firebase.profile.displayName);
    const email = useSelector((state) => state.firebase.profile.email);
    const role = useSelector((state) => state.firebase.profile.role);
    const paymentID = email;
    let paymentURL = "";

    const support = async () => {
        const api = "https://api.capusta.space/v1/partner";
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const token = "9e144662-5f8e-4d63-bebe-a3cff6f907c6";

        const headers = new Headers();
        headers.append("Authorization", "Bearer kirusfg@gmail.com:" + token);
        headers.append("Content-Type", "application/json");

        let body = {
            id: paymentID,
            amount: {
                amount: 30000,
                currency: "RUB",
            },
            projectCode: "vatriu.me",
        };

        if (paymentURL === "") {
            const payment = await fetch(proxy + api + "/payment", {
                method: "POST",
                mode: "cors",
                headers,
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .catch((err) => err);

            console.log(payment);

            if (payment.status === "CREATED") {
                paymentURL = payment.payUrl;

                window.location.href = paymentURL;
            }
        } else {
            window.location.href = paymentURL;
        }
    };

    const checkIfSupported = async () => {
        const api = "https://api.capusta.space/v1/partner";
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const token = "9e144662-5f8e-4d63-bebe-a3cff6f907c6";

        const headers = new Headers();
        headers.append("Authorization", "Bearer kirusfg@gmail.com:" + token);

        const payment = await fetch(
            proxy + api + "/status?transaction-id=" + paymentID,
            {
                method: "GET",
                mode: "cors",
                headers,
            }
        )
            .then((res) => res.json())
            .catch((err) => err);

        if (payment.status === "SUCCESS") {
            firebase.updateProfile({ role: "Supporter" });
        } else if (payment.status === "CREATED") {
            paymentURL = payment.payUrl;
        }
    };

    useEffect(() => {
        if (profile.isLoaded && !profile.isEmpty)
            if (profile.role !== undefined)
                if (profile.role !== "Supporter" && profile.role !== "Admin")
                    checkIfSupported();
    }, [profile]);

    return (
        <div className="user-info">
            <img src={avatar} alt="avatar" />
            <h1>{username}</h1>
            <span
                className={
                    role === "NU Member"
                        ? "nu-member"
                        : role === "Supporter"
                        ? "supporter"
                        : role === "Admin"
                        ? "admin"
                        : null
                }
            >
                {role}
            </span>
            <div className="actions">
                {/* role !== "Supporter" ? (
          <button
            className="btn btn-confirm"
            onClick={(e) => {
              e.preventDefault();

              support();
            }}
          >
            Get a supporter tag
          </button>
        ) : (
          ""
        ) */}
                <button
                    className="btn btn-error"
                    onClick={(e) => {
                        e.preventDefault();

                        if (auth.isLoaded && !auth.isEmpty) {
                            firebase.logout();
                            history.push("/");
                        } else {
                            history.push("/");
                        }
                    }}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default UserInfo;
