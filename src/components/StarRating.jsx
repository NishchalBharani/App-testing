// components/StarRating.jsx
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export default function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(null);

  // Snap to nearest 0.5 internally, but we only allow full-star clicks (cleaner UX)
  const displayValue = hover !== null ? hover : Math.round(value * 2) / 2;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        py: 2,
      }}
    >
      {/* Rating text */}
      <Typography
        variant="body2"
        sx={{
          color: "#64748b",
          fontWeight: 500,
          minWidth: 80,
          textAlign: "right",
          mr: 2,
        }}
      >
        {displayValue === 0 ? "Rate it" : `${displayValue.toFixed(1)} / 5.0`}
      </Typography>

      {/* Stars */}
      <Box sx={{ display: "flex", gap: 1 }}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = displayValue >= star;

          return (
            <Box
              key={star}
              onMouseEnter={() => onChange && setHover(star)}
              onMouseLeave={() => onChange && setHover(null)}
              onClick={() => onChange && onChange(star)}
              sx={{
                cursor: onChange ? "pointer" : "default",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", // bouncy feel
                transform: isFilled ? "scale(1.2)" : "scale(1)",
              }}
            >
              {isFilled ? (
                <StarIcon
                  sx={{
                    fontSize: 44,
                    filter: "drop-shadow(0 4px 12px rgba(251, 191, 36, 0.5))",
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent", // ← this replaces color: transparent
                    WebkitTextStroke: "1px #ca8a04",
                  }}
                />
              ) : (
                <StarOutlineIcon
                  sx={{
                    fontSize: 44,
                    color: "#e2e8f0",
                    transition: "color 0.3s",
                    "&:hover": onChange ? { color: "#cbd5e1" } : {},
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}