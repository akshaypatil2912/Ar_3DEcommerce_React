// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button, Grid, Divider, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ProfileContainer = styled(Box)({
    maxWidth: 800,
    margin: 'auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    marginTop: '82px',
    marginLeft: '460px'
});

const ProfileHeader = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
});

const OrderList = styled(List)({
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '1rem',
});

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let loginuser=sessionStorage.getItem('userName')
        const getUserDetails = async () => {
            try {
                const response = await axios.get("https://localhost:44332/GetUserDetails?userName="+loginuser, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setUser(response.data.result[0]);
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
              };
              getUserDetails();
      }, []);
   
    const orderHistory = [
        { id: "12345", date: "Oct 20, 2023", amount: "$150", status: "Delivered" },
        { id: "12346", date: "Sep 18, 2023", amount: "$200", status: "Shipped" },
        { id: "12347", date: "Aug 5, 2023", amount: "$80", status: "Pending" },
    ];

    const navigate =useNavigate();
    const handleAccountSettingClick=()=>{
        navigate('/AccountSettingsForm');
    } 

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <ProfileContainer>
            {/* Profile Header */}
            <ProfileHeader>
                <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
                {user?.UserName ? user.UserName[0] : <BsFillPersonFill size={40} />}
                </Avatar>
                <Box>
                    <Typography variant="h5">{user.UserName}</Typography>
                    <Typography color="textSecondary">{user.Email}</Typography>
                    <Typography color="textSecondary">{user.PhoneNo}</Typography>
                </Box>
            </ProfileHeader>

            {/* Account Settings */}
            <Button
                variant="outlined"
                color="primary"
                startIcon={<FiSettings />}
                sx={{ mb: 2 }}
                onClick={handleAccountSettingClick}
            >
                Account Settings
            </Button>

            {/* Order History */}
            <Typography variant="h6" gutterBottom>
                Order History
            </Typography>
            <OrderList>
                {orderHistory.map((order) => (
                    <ListItem key={order.id} divider>
                        <ListItemText
                            primary={`Order #${order.id}`}
                            secondary={`Date: ${order.date} • Amount: ${order.amount} • Status: ${order.status}`}
                        />
                    </ListItem>
                ))}
            </OrderList>

            {/* Other Account Info */}
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Shipping Address</Typography>
                    <Typography color="textSecondary">
                    {user.Address}, {user.City}, {user.State}, India
                    </Typography>
                </Grid>
            </Grid>
        </ProfileContainer>
    );
};

export default ProfilePage;
