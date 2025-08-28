import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext } from "react";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
    // const editedExpenseId = route.params.expenseId;
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const expensesCtx = useContext(ExpensesContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, { amount: 10.00, date: new Date('2025-08-27'), description: 'Updated data' });
        } else {
            expensesCtx.addExpense({ amount: 10.00, date: new Date('2025-08-27'), description: 'Add data' });
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm />
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>

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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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