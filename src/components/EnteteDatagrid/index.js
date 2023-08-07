import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Badge, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const EnteteDatagrid = (props) => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -13,
      top: 17,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
      <StyledBadge badgeContent={props.totalCount ?? 0} color="secondary">
        <Typography variant="h4" component="h2">
          {props.enteteText}
        </Typography>
      </StyledBadge>

      <Button
        variant="contained"
        disabled={props.ctaButtonDisabled ?? false}
        onClick={(e) => props.ctaButtonOnClick(e)}
        sx={{ color: "#FFFFFF" }}
        endIcon={<AddCircleOutlineOutlinedIcon />}
      >
        {props.ctaButtonText}
      </Button>
    </Box>
  );
};

EnteteDatagrid.propTypes = {
  enteteText: PropTypes.string.isRequired,
  ctaButtonOnClick: PropTypes.func.isRequired,
  ctaButtonText: PropTypes.string.isRequired,
  ctaButtonDisabled: PropTypes.bool,
  totalCount: PropTypes.number.isRequired,
};

export default EnteteDatagrid;
