export async function getItemsHandler(userId) {
    try {
        const response = await fetch('https://graduation-project-2e021-default-rtdb.europe-west1.firebasedatabase.app/receipts.json');

        if (!response.ok) {
            throw new Error('Request failed!');
        }
        let data = await response.json();

        let parsedData = Object.values(data);

        parsedData.forEach((el, index) => {
            for (const key in data) {
                el.baseID = key;
            }
        })
        const result = parsedData?.filter(item => item.userId == userId);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getItemsByDataHandler(type, items) {
    const day = new Date();
    let totalResult = 0;
    let maxDate;
    let minDate;
    let result = { errorMessage: '', data: [], successMessage: '', totalAmount: 0 };

    if (type === 'Last Weak') {
        const minDate = day.getDate() - 6;
        const maxDate = day.getDate();
        result.data = items.filter(item => new Date(item.date).getDay() >= minDate && new Date(item.date).getDay() <= maxDate);
    }
    if (type === 'Last Month') {
        maxDate = day.getMonth();
        minDate = day.getMonth() - 1;
        result.data = items.filter(item => new Date(item.date).getMonth() >= minDate && new Date(item.date).getMonth() <= maxDate);
    }
    if (type === 'Last Year') {
        maxDate = day.getFullYear();
        minDate = day.getFullYear() - 1;
        result.data = items.filter(item => new Date(item.date).getFullYear() >= minDate && new Date(item.date).getFullYear() <= maxDate);
    }

    if (result.length <= 0) {
        result.errorMessage = 'Don`t have items for this option!';
    } else {
        result?.data?.forEach(el => totalResult += Number(el.amount));
        result.data = Object.values(result.data);
        result.successMessage = `${type} amount: ${totalResult}$`;
        result.totalAmount = totalResult;
    }

    return result;
}