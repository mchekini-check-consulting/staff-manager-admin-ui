/* eslint-disable react/prop-types */
import CancelIcon from "@mui/icons-material/Cancel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCreateSocietyMutation } from "services/society/society.api.slice";
import { resetForm, togglePopup, updateForm } from "services/society/society.slice";
import { InputAdornment } from "@material-ui/core";
import { Euro } from "@material-ui/icons";

const NewSocietyPopup = () => {
    const dispatch = useDispatch();
    const openPopup = useSelector((s) => s.society.openPopup);
    const formData = useSelector((s) => s.society.newSocietyForm);
    const [createSociety, { error, isLoading, isSuccess }] = useCreateSocietyMutation();

    const handleClose = () => {
        dispatch(resetForm());
        dispatch(togglePopup());
    };

    const handleReset = () => {
        dispatch(resetForm());
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateForm({ name, value }));
    };

    const handleSubmit = () => {
        createSociety(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(togglePopup());
            dispatch(resetForm());
            toast.success("La Société a été créé avec succès", {
                autoClose: 2000,
            });
        }
    }, [isSuccess]);

    function isFormValid(formData) {
        for (const key in formData) {
            if (formData.hasOwnProperty(key) && formData[key] === "") {
                return false;
            }
        }
        return true;
    }

    return (
        <>
            <Dialog open={openPopup} onClose={handleClose} fullWidth maxWidth="md">
                <Box p={1}>
                    <DialogTitle>Ajouter les données de la société</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                value={formData.name}
                                onChange={(e) => handleFormChange(e)}
                                autoFocus
                                name="name"
                                label="Nom de la société"
                                type="text"
                                margin="dense"
                                required
                                fullWidth
                                variant="outlined"
                                disabled={isLoading}
                                helperText={error?.validations?.name}
                                error={Boolean(error?.validations?.name)}
                            />
                            <TextField
                                value={formData.siret}
                                onChange={(e) => handleFormChange(e)}
                                name="siret"
                                label="N° de SIRET"
                                type="text"
                                margin="dense"
                                required
                                fullWidth
                                variant="outlined"
                                disabled={isLoading}
                                helperText={error?.validations?.siret}
                                error={Boolean(error?.validations?.siret)}
                            />
                            <TextField
                                value={formData.vat}
                                onChange={(e) => handleFormChange(e)}
                                name="vat"
                                label="N° de TVA"
                                type="text"
                                margin="dense"
                                required
                                fullWidth
                                variant="outlined"
                                disabled={isLoading}
                                helperText={error?.validations?.vat}
                                error={Boolean(error?.validations?.vat)}
                            />
                            <TextField
                                value={formData.contact}
                                onChange={(e) => handleFormChange(e)}
                                name="contact"
                                label="Contact"
                                type="text"
                                margin="dense"
                                required
                                fullWidth
                                variant="outlined"
                                disabled={isLoading}
                                helperText={error?.validations?.contact}
                                error={Boolean(error?.validations?.contact)}
                            />
                            <TextField
                                value={formData.email}
                                onChange={(e) => handleFormChange(e)}
                                name="email"
                                label="Email"
                                type="email"
                                margin="dense"
                                required
                                fullWidth
                                variant="outlined"
                                disabled={isLoading}
                                helperText={error?.validations?.email}
                                error={Boolean(error?.validations?.email)}
                            />
                            <TextField
                                value={formData.address}
                                onChange={(e) => handleFormChange(e)}
                                name="address"
                                label="Adresse"
                                type="email"
                                margin="dense"
                                required
                                fullWidth
                                variant="outlined"
                                disabled={isLoading}
                                helperText={error?.validations?.address}
                                error={Boolean(error?.validations?.address)}
                            />
                            <TextField
                                value={formData.capital}
                                onChange={(e) => handleFormChange(e)}
                                name="capital"
                                label="Capital"
                                type="number"
                                margin="dense"
                                required
                                fullWidth
                                variant="outlined"
                                disabled={isLoading}
                                helperText={error?.validations?.capital}
                                error={Boolean(error?.validations?.capital)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><Euro /></InputAdornment>,
                                }}
                            />
                        </form>
                    </DialogContent>

                    <DialogActions style={{ padding: 0.5 }}>
                        <Stack
                            width="100%"
                            justifyContent={"space-between"}
                            direction={{ xs: "column", sm: "row" }}
                        >
                            <Button
                                onClick={handleReset}
                                endIcon={<RestartAltIcon />}
                                disabled={isLoading}
                                color="error"
                            >
                                Réinitialiser
                            </Button>
                            <Stack direction={{ xs: "column", sm: "row" }}>
                                <Button
                                    onClick={handleClose}
                                    disabled={isLoading}
                                    endIcon={<CancelIcon />}
                                    color="error"
                                >
                                    Annuler
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isLoading || !isFormValid(formData)}
                                    endIcon={<SendIcon />}
                                >
                                    Valider
                                </Button>
                            </Stack>
                        </Stack>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};
export default NewSocietyPopup;