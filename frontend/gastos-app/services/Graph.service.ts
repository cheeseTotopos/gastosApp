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

//***********************
export type InvexpData = {
    month: string;
    invoices: number;
    expenses: number;
};


export async function getInvoicesVSExpensesData(year: number): Promise<InvexpData[]>{
    const path = "http://localhost:5018/graphs/invexp";

    const rawresponse = await axios.post(
        path,
        { Year: year },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    const response: InvexpData[] = rawresponse.data;
    return response;
}

//***********************
export type Frequencies = {
    key: number,
    clasification: string,
    clasificationId: number,
    count: number
};

export type Totals = {
    key: number,
    clasification: string,
    clasificationId: number,
    total: number
};

export type TopClasData = {
    totals: Totals[],
    frequencies: Frequencies[],
    userAmount: number
};

type RawData = {
    totals: {
        clasifications: Totals[],
        userAmount: number
    },
    frequencies: Frequencies[]
};

export async function getTopClasificationsData(year: number): Promise<TopClasData>{
    let path = "http://localhost:5018/graphs/topclas";

    let rawresponse = await axios.post(
        path,
        { Year: year },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    let rawData: RawData = rawresponse.data;
    //build the correct response format
    let totals:Totals[] = rawData.totals.clasifications.map(x =>{
        let obj: Totals = {
            key: x.clasificationId,
            clasification: x.clasification,
            clasificationId: x.clasificationId,
            total: x.total
        };
        return obj;
    });

    let frequencies: Frequencies[] = rawData.frequencies.map(x =>{
        let obj: Frequencies = {
            key: x.clasificationId,
            clasification: x.clasification,
            clasificationId: x.clasificationId,
            count: x.count
        };
        return obj;
    });

    let response:TopClasData = {
        totals: totals,
        frequencies: frequencies,
        userAmount: rawData.totals.userAmount
    };

    return response;
}