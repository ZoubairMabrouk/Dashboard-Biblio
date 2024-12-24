import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
} from "@mui/material";
import axios from "axios";
import {
  deletecommandes,
  fetchcommandes,
} from "../../services/commandeservice";
import { fetchSubscribes } from "../../services/Subscribeservice";

const Subscribe = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchsubs = async () => {
    try {
      const response = await fetchSubscribes();
      setSubs(response.data);
      console.log(subs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  // Fetch users from the server
  useEffect(() => {
    fetchsubs();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Date d'inscriptions</TableCell>
            <TableCell>Date d'expiration</TableCell>
            <TableCell>Abonnement</TableCell>
            <TableCell>Statu d'abonnement</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            subs.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.id}</TableCell>
                <TableCell>{sub.client_name}</TableCell>
                <TableCell>{sub.ins_date}</TableCell>
                <TableCell>{sub.exp_date}</TableCell>
                <TableCell>{sub.name}</TableCell>
                <TableCell>{sub.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Subscribe;
