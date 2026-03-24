export const formatCurrency = (
    amount: number,
    options?: {
        compact?: boolean;
        showCurrency?: boolean;
    }
) => {
    const {compact = false, showCurrency = true} = options ?? {};

    const normalizedAmount = Object.is(amount, -0) ? 0 : amount;
    const formatted = compact
        ? Math.round(normalizedAmount).toLocaleString('fr-FR')
        : normalizedAmount.toLocaleString('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return showCurrency ? `${formatted} €` : formatted;
};

