import { QueryParam } from "@/types/api.type";

export const convertToQueryString = <T>(params: QueryParam<T>): string => {
    console.log("params : ", params);
    const queryString = Object.entries(params)
        .map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
                return Object.entries(value)
                    .filter(
                        ([_subKey, subValue]) =>
                            subValue !== null && subValue !== ""
                    )
                    .map(([subKey, subValue]) => `${subKey}=${subValue}`)
                    .join("&");
            }
            return value !== null ? `${key}=${value}` : "";
        })
        .filter((queryPart) => queryPart !== "")
        .join("&");

    return queryString;
};
