// PaymentPage.js
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box, Typography, CircularProgress } from '@mui/material';

const PaymentPage = () => {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleApprove = (orderID) => {
        // Order is successfully paid
        setPaidFor(true);
        alert("Thank you for your payment! Transaction completed.");
    };

    const handleError = (err) => {
        setError(err);
        console.error("PayPal Checkout Error:", err);
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2,marginTop:12 }}>
            <Typography variant="h5" gutterBottom>
                PayPal Payment
            </Typography>

            {paidFor ? (
                <Typography variant="h6" color="primary">
                    Payment successful! Thank you.
                </Typography>
            ) : (
                <PayPalScriptProvider options={{ "client-id": "AQeP9aUZQuhCaCqTvMlgXwnz82ADXjinBP0qZ1-CcKakuCSa8zlvMatOMkl7qxwsx2DHNDGdBfJMZbYd" }}>
                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: "10.00", // specify amount here
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={async (data, actions) => {
                            setLoading(false);
                            const order = await actions.order.capture();
                            handleApprove(order.id);
                        }}
                        onError={(err) => handleError(err)}
                    />
                </PayPalScriptProvider>
            )}

            {error && (
                <Typography color="error" variant="body2">
                    An error occurred with your payment: {error}
                </Typography>
            )}
        </Box>
    );
};

export default PaymentPage;
