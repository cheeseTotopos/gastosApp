import axios from "axios";

type Classification = {
    [key: string]: number;
};

type MonthlyClassification = {
    month: string;
    clasifications: Classification;
};

export type ExpenseData = {
    month: string;
    [classification: string]: string | number;
};


export async function getExpensesPerYearData(year: number): Promise<ExpenseData[]> {

    const path = "http://localhost:5018/graphs/experyear";

    const rawresponse = await axios.post(
        path,
        { Year: year },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    const data: MonthlyClassification[] =
        rawresponse.data.clasifications;

    const classifications = [
        ...new Set(
            data.flatMap(
                x => Object.keys(x.clasifications)
            )
        )
    ];

    const response: ExpenseData[] = data.map(x => {

        const result: ExpenseData = {
            month: x.month
        };

        classifications.forEach(classification => {
            result[classification] =
                x.clasifications[classification] ?? 0;
        });

        return result;
    });

    return response;
}