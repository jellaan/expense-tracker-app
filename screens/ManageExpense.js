import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function ManageExpense({ route, navigation }) {
    // const editedExpenseId = route.params.expenseId;
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const expensesCtx = useContext(ExpensesContext);

    const selectedExpenses = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        await deleteExpense(editedExpenseId);
        // setIsSubmitting(false); no need since we are closing the screen by going back
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData);
            await updateExpense(editedExpenseId, expenseData);
        } else {
            // storeExpense(expenseData);
            // expensesCtx.addExpense(expenseData);
            const id = await storeExpense(expenseData);
            expensesCtx.addExpense({...expenseData, id: id})
        }
        // setIsSubmitting(false); no need since we are closing the screen by going back
        navigation.goBack();
    }

    if(isSubmitting) {
        return <LoadingOverlay />;
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                defaultValues={selectedExpenses}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton style={styles.button} icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
                </View>
            )}
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});