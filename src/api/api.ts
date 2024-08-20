import {
    BaseQueryApi,
    createApi,
    FetchArgs,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { BASE_URL } from "../config";
import { ApiResponse } from "@/types/api.type";
import { RefreshTokenResponse } from "@/types/auth.type";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: 'include',
    prepareHeaders: (headers) => {
        // const token = (getState() as RootState).auth.accessToken;
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        if (refreshToken) {
            // console.log('refreshToken : ', refreshToken);
            headers.set("refresh-token", refreshToken);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: any
) => {
    await mutex.waitForUnlock();

    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions);

    // If you want, handle other status codes, too
    if (result?.error?.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                console.log("REAUTH...");

                // send refresh token to get new access token
                const refreshResult = await baseQuery(
                    "/auth/refresh-token",
                    api,
                    extraOptions
                );

                if (refreshResult?.data) {
                    console.log("REAUTH -> SUCCESS...");

                    const newRefreshResult =
                        refreshResult.data as ApiResponse<RefreshTokenResponse>;

                    // store the new token
                    // api.dispatch(setAccessToken({ value: newRefreshResult.access_token }));
                    localStorage.setItem("token", newRefreshResult.data.token);
                    localStorage.setItem(
                        "refreshToken",
                        newRefreshResult.data.refreshToken
                    );

                    // retry original query with new access token
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    console.log("REAUTH -> ERROR...");

                    if (refreshResult?.error?.status === 403) {
                        (refreshResult.error.data as any).message =
                            "Sesi anda telah berakhir";
                    }

                    return refreshResult;
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        "Students",
        "Teachers",
        "Courses",
        "Cycles",
        "Classrooms",
        "Classroom",
        "User",
        "Meetings",
        "Meeting",
        "Attendances",
        "Payments",
    ],
    endpoints: () => ({}),
});

// description (course), cycleDescription(class), price(class)
