/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { Button, TextField, Box, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useUpdateMissionMutation } from "services/missions/missionSlice";
import { useEffect } from "react";
import enGB from "date-fns/locale/en-GB";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateMission({ isOpen, mission, setMissionToUpdate, handleClose, existingMissions, Dclients, Dcollaborators, setMissions }) {
    const formStyle = { width: "100%" };
    const blockStyle = { flex: 0.5, display: "flex", flexDirection: "column", gap: 2 };
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 850,
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: "10px",
        px: 4,
        py: 3,
    };
    const [updateMission, { error, isLoading, isSuccess }] = useUpdateMissionMutation();

    const handleSubmit = () => {
        const formattedMission = {
            "id": mission.id,
            "nameMission": mission.missionName,
            "startingDateMission": format(new Date(mission.startingDate), "dd/MM/yyyy"),
            "endingDateMission": format(new Date(mission.endingDate), "dd/MM/yyyy"),
            "customerName": mission.customerName,
            "customerContactLastname": mission.customerContactLastName,
            "customerContactFirstname": mission.customerContactFirstName,
            "customerContactEmail": mission.customerContactEmail,
            "customerContactPhone": mission.customerContactPhone,
            "missionDescription": mission.missionDescription,
            "customerId": mission.customerId,
            "collaboratorId": mission.collaboratorId

        }
        updateMission(formattedMission);
    };

    useEffect(() => {
        if (isSuccess) {
            handleClose(false);
            setMissions(
                existingMissions.map((obj) => {
                    return (obj.id == mission.id ? {
                        ...mission,
                        "startingDate": new Date(mission.startingDate).toLocaleDateString("fr-CA"),
                        "endingDate": new Date(mission.endingDate).toLocaleDateString("fr-CA")
                    } : obj)
                })
            );

            toast.success("la mission a été modifié avec succès", {
                autoClose: 2000,
            });
        }
    }, [isSuccess]);

    const disableSubmitBtn = () => {

        return (
            !(
                mission.missionName &&
                mission.startingDate &&
                mission.endingDate &&
                mission.customerContactLastName &&
                mission.customerContactFirstName &&
                mission.customerContactEmail &&
                mission.customerContactPhone
            )
        );
    };
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-update-mission"
            aria-describedby="modal-update-mission"
        >
            <Box sx={modalStyle} component="form" noValidate autoComplete="off">
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Modifier la mission
                </Typography>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <Typography variant="body2" sx={{ textAlign: "center", color: "red" }}>
                            {error.message}
                        </Typography>
                    )}
                    <Box sx={{ display: "flex", gap: 4, "& .MuiTextField-root": { width: "100%" } }}>
                        <Box sx={blockStyle}>
                            <Typography id="modal-modal-description" variant="body2" component="p" sx={{ mt: 2 }}>
                                informations de la mission
                            </Typography>
                            <TextField
                                variant="outlined"
                                label="Nom de la mission"
                                value={mission.missionName}
                                onChange={(e) => setMissionToUpdate({ ...mission, missionName: e.target.value })}
                                required
                                helperText={error?.validations?.nameMission}
                                error={Boolean(error?.validations?.nameMission)}
                                disabled={isLoading}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                                <DatePicker
                                    label="Date de début *"
                                    value={new Date(mission.startingDate)}
                                    onChange={(newValue) =>
                                        setMissionToUpdate({ ...mission, startingDate: newValue })
                                    }
                                    views={["day", "month", "year"]}
                                    required
                                    slotProps={{
                                        textField: {
                                            helperText: error?.validations?.startingDate,
                                            error: Boolean(error?.validations?.startingDate),
                                            disabled: isLoading,
                                        },
                                    }}
                                />

                                <DatePicker
                                    label="Date de fin *"
                                    value={new Date(mission.endingDate)}
                                    onChange={(newValue) =>
                                        setMissionToUpdate({ ...mission, endingDate: newValue })
                                    }
                                    views={["day", "month", "year"]}
                                    required
                                    slotProps={{
                                        textField: {
                                            helperText: error?.validations?.endingDate,
                                            error: Boolean(error?.validations?.endingDate),
                                            disabled: isLoading,
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                            <TextField
                                select
                                label="Client"
                                size="normal"
                                value={mission.customerId}
                                onChange={(e) => setMissionToUpdate({ ...mission, customerId: e.target.value })}
                                required
                                helperText={error?.validations?.customerId}
                                error={Boolean(error?.validations?.customerId)}
                                disabled={isLoading}
                            >

                                <MenuItem value="" >
                                    Séléctionner un client
                                </MenuItem>
                                {Dclients &&
                                    Dclients.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.customerName}
                                        </MenuItem>))
                                }


                            </TextField>

                            <TextField
                                select
                                label="Collaborateur"
                                value={mission.collaboratorId}
                                onChange={(e) => setMissionToUpdate({ ...mission, collaboratorId: e.target.value })}
                                disabled={isLoading}
                            >
                                <MenuItem value="" >
                                    Sélectionner un collaborateur
                                </MenuItem>
                                {Dcollaborators
                                    ? Dcollaborators.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {`${option.firstName} ${option.lastName}`}
                                        </MenuItem>
                                    ))
                                    : ""}
                            </TextField>
                        </Box>
                        <Box sx={blockStyle}>
                            <Typography id="modal-modal-description" variant="body2" component="p" sx={{ mt: 2 }}>
                                Contact du client
                            </Typography>

                            <TextField
                                variant="outlined"
                                label="Nom"
                                value={mission.customerContactLastName}
                                onChange={(e) =>
                                    setMissionToUpdate({ ...mission, customerContactLastName: e.target.value })
                                }
                                required
                                helperText={error?.validations?.customerContactLastname}
                                error={Boolean(error?.validations?.customerContactLastname)}
                                disabled={isLoading}
                            />

                            <TextField
                                variant="outlined"
                                label="Prénom"
                                value={mission.customerContactFirstName}
                                onChange={(e) =>
                                    setMissionToUpdate({ ...mission, customerContactFirstName: e.target.value })
                                }
                                required
                                helperText={error?.validations?.customerContactFirstName}
                                error={Boolean(error?.validations?.customerContactFirstName)}
                                disabled={isLoading}
                            />

                            <TextField
                                variant="outlined"
                                label="Email"
                                value={mission.customerContactEmail}
                                onChange={(e) =>
                                    setMissionToUpdate({ ...mission, customerContactEmail: e.target.value })
                                }
                                required
                                helperText={error?.validations?.customerContactEmail}
                                error={Boolean(error?.validations?.customerContactEmail)}
                                disabled={isLoading}
                            />

                            <TextField
                                variant="outlined"
                                label="N° Télephone"
                                value={mission.customerContactPhone}
                                onChange={(e) =>
                                    setMissionToUpdate({ ...mission, customerContactPhone: e.target.value })
                                }
                                required
                                helperText={error?.validations?.customerContactPhone}
                                error={Boolean(error?.validations?.customerContactPhone)}
                                disabled={isLoading}
                            />

                            <TextField
                                variant="outlined"
                                multiline
                                rows={3}
                                label="Descriptif de la mission (Facultatif)"
                                value={mission.missionDescription}
                                onChange={(e) =>
                                    setMissionToUpdate({ ...mission, missionDescription: e.target.value })
                                }
                                disabled={isLoading}
                            />
                        </Box>
                    </Box>
                </form>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                    <Button variant="text" color="error" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading || disableSubmitBtn()}>
                        Modifier le client
                    </Button>
                </Box>
            </Box >
        </Modal >
    );
}
