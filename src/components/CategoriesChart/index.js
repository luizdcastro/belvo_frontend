import React, { useEffect, useState } from 'react'
import { Pie } from "react-chartjs-2"

const CategoriesChart = ({ selectedAccount }) => {
    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        if (selectedAccount?.transaction !== undefined) {
            let categories = new Set()
            // eslint-disable-next-line no-unused-vars
            for (const [i, item] of Object.entries(selectedAccount?.transaction)) {
                categories.add(item.category)
            }
            const array = Array.from(categories)
            setLabels(array)
        }
    }, [selectedAccount])

    useEffect(() => {
        let amounts = []
        // eslint-disable-next-line no-unused-vars
        for (const [i, label] of Object.entries(labels)) {
            const transaction_category = Object.values(selectedAccount?.transaction).filter(transaction => transaction?.category === label)
            let transaction_amount = []
            const reducer = (previousValue, currentValue) => previousValue + currentValue
            // eslint-disable-next-line no-unused-vars
            for (const [i, item] of Object.entries(transaction_category)) {
                transaction_amount.push(item.amount)
            }
            const transaction_list = {
                label: label,
                transactions: transaction_amount.reduce(reducer)
            }
            amounts.push(transaction_list)
        }
        setData(amounts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labels])

    let customLabels = data.map((label, index) => `${label?.label == null ? "Others" : label?.label}`)
    let customAmounts = data.map((amount, index) => `${amount?.transactions}`)

    const chartdata = {
        labels: customLabels,
        datasets: [
            {
                label: "Expense Category",
                backgroundColor: [
                    "#ff5d9e",
                    "#8f71ff",
                    "#82acff",
                    "#8bffff",
                    '#fde994'
                ],
                data: customAmounts,
            },
        ],
    };

    return (
        <div style={{ height: 300, width: 500, marginLeft: 15 }}>
            <p style={{ fontSize: '0.8rem', marginBottom: 10 }}>CATEGORIES</p>
            <Pie
                data={chartdata}
                options={{
                    legend: { display: true, position: "right" },

                    datalabels: {
                        display: true,
                        color: "white",
                    },
                    tooltips: {
                        backgroundColor: "#5a6e7f",
                    },
                }}
            />
        </div>
    )
}

export default CategoriesChart