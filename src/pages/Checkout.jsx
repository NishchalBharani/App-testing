// pages/Checkout.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalState";
import {
  Box,
  Typography,
  Button,
  Paper,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
  CircularProgress,
  alpha,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CouponIcon from "@mui/icons-material/LocalOffer";
import StarRating from "../components/StarRating";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useGlobal();

  const listing = state.listings.find((apt) => apt.id === Number(id));

  // Local states
  const [discountAmount, setDiscountAmount] = useState(0); // Total discount applied ($ or % converted to $)
  const [appliedCoupon, setAppliedCoupon] = useState(null); // {code, type: 'percent' or 'fixed', value, expiry}
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [customCoupon, setCustomCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState({ loading: false, error: "", success: "" });

  // Fake available coupons (in real app, fetch from backend)
  const availableCoupons = [
    { code: "TRAVEL10", type: "percent", value: 50, expiry: new Date("2025-12-31") }, // 10%
    { code: "SAVE50", type: "fixed", value: 50, expiry: new Date("2024-12-31") }, // $50 off
    { code: "FIRSTBOOK20", type: "percent", value: 20, expiry: new Date("2025-06-30") }, // 20%
  ];

  if (!listing) {
    return <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}><CircularProgress /></Box>;
  }

  const originalPrice = listing.price; // Per night
  const finalPrice = Math.max(0, originalPrice - discountAmount); // Cap at 0

  const handleOpenCouponModal = () => setCouponModalOpen(true);
  const handleCloseCouponModal = () => {
    setCouponModalOpen(false);
    setCustomCoupon("");
    setCouponStatus({ loading: false, error: "", success: "" });
  };

  const applyCoupon = (coupon) => {
    const now = new Date();
    if (coupon.expiry < now) {
      setCouponStatus({ ...couponStatus, error: "Coupon expired!" });
      return;
    }

    let newDiscount = 0;
    if (coupon.type === "percent") {
      newDiscount = (coupon.value / 100) * originalPrice;
    } else if (coupon.type === "fixed") {
      newDiscount = coupon.value;
    }

    // Cap discount (e.g., max $100 off total)
    newDiscount = Math.min(newDiscount, 100);

    setDiscountAmount(newDiscount);
    setAppliedCoupon(coupon);
    setCouponStatus({ ...couponStatus, success: `Applied ${coupon.code}!` });
    setTimeout(handleCloseCouponModal, 1500); // Auto-close on success
  };

  const handleSelectCoupon = (coupon) => {
    setCouponStatus({ loading: true, error: "", success: "" });
    setTimeout(() => {
      applyCoupon(coupon);
      setCouponStatus({ loading: false });
    }, 800); // Fake API delay
  };

  const handleCheckCustomCoupon = () => {
    setCouponStatus({ loading: true, error: "", success: "" });
    setTimeout(() => {
      // Simulate backend check - add your own logic or API call
      const foundCoupon = availableCoupons.find(c => c.code === customCoupon.toUpperCase());
      if (foundCoupon) {
        applyCoupon(foundCoupon);
      } else {
        setCouponStatus({ loading: false, error: "Coupon not found!" });
      }
    }, 800);
  };

  const handleConfirmBooking = () => {
    alert(`Booked ${listing.title} for $${finalPrice.toFixed(2)}!`);
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        py: 6,
        px: { xs: 3, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 6,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            background: "linear-gradient(90deg, #1e293b, #475569)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Secure Your Stay
        </Typography>

        <Paper
          sx={{
            borderRadius: "28px",
            p: 4,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Left: Listing Details */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", mb: 2 }}>
              {listing.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {listing.location}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, color: "#475569" }}>
                Rating:
              </Typography>
              <StarRating value={listing.rating} />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Check-in:</strong> Flexible
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Check-out:</strong> Flexible
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Guests:</strong> 2 adults
            </Typography>
            {/* Add more details like images, amenities */}
          </Box>

          {/* Right: Pricing */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              borderRadius: "20px",
              background: alpha("#f1f5f9", 0.7),
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
              Pricing Summary
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography>Base Price (1 night)</Typography>
              <Typography>${originalPrice.toFixed(2)}</Typography>
            </Box>
            {appliedCoupon && (
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, color: "#22c55e" }}>
                <Typography>Discount ({appliedCoupon.code})</Typography>
                <Typography>-${discountAmount.toFixed(2)}</Typography>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
              <Typography variant="h6">Final Total</Typography>
              <Typography variant="h6">${finalPrice.toFixed(2)}</Typography>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<CouponIcon />}
              onClick={handleOpenCouponModal}
              sx={{
                mb: 4,
                py: 1.5,
                borderRadius: "16px",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Add Coupon
            </Button>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleConfirmBooking}
              sx={{
                py: 2,
                borderRadius: "18px",
                background: "linear-gradient(90deg, #1e293b 0%, #334155 100%)",
                textTransform: "none",
                fontSize: "1.1rem",
                "&:hover": { background: "#0f172a" },
              }}
            >
              Confirm & Book
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Coupon Modal */}
      <Modal
        open={couponModalOpen}
        onClose={handleCloseCouponModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper
          sx={{
            width: { xs: "90%", sm: 400 },
            p: 4,
            borderRadius: "24px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
            Available Coupons
          </Typography>

          <List sx={{ mb: 3 }}>
            {availableCoupons.map((coupon) => (
              <ListItemButton
                key={coupon.code}
                onClick={() => handleSelectCoupon(coupon)}
                sx={{ borderRadius: "12px", mb: 1, "&:hover": { background: alpha("#fbbf24", 0.1) } }}
              >
                <ListItemText
                  primary={coupon.code}
                  secondary={`${coupon.type === "percent" ? `${coupon.value}% off` : `$${coupon.value} off`} - Expires ${coupon.expiry.toLocaleDateString()}`}
                />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
            Or Enter Custom Code
          </Typography>

          <TextField
            fullWidth
            label="Coupon Code"
            value={customCoupon}
            onChange={(e) => setCustomCoupon(e.target.value.toUpperCase())}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleCheckCustomCoupon}
            disabled={couponStatus.loading || !customCoupon}
            sx={{
              py: 1.5,
              borderRadius: "16px",
              background: "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)",
              textTransform: "none",
              "&:hover": { background: "#d97706" },
            }}
          >
            {couponStatus.loading ? <CircularProgress size={24} color="inherit" /> : "Check & Apply"}
          </Button>

          {couponStatus.error && (
            <Box sx={{ mt: 2, display: "flex", alignItems: "center", color: "#ef4444" }}>
              <ErrorIcon sx={{ mr: 1 }} />
              <Typography>{couponStatus.error}</Typography>
            </Box>
          )}

          {couponStatus.success && (
            <Box sx={{ mt: 2, display: "flex", alignItems: "center", color: "#22c55e" }}>
              <CheckCircleIcon sx={{ mr: 1 }} />
              <Typography>{couponStatus.success}</Typography>
            </Box>
          )}
        </Paper>
      </Modal>
    </Box>
  );
}