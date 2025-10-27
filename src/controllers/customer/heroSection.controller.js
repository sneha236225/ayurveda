import HomeSectionData from "../../models/heroSectionModel.js";

// Get hero section data
export const getHeroSectionData = async (req, res) => {
    try {
        const section = await HomeSectionData.findOne().sort({ createdAt: -1 });
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Right side section fetched successfully",
            data: section,
        });
    } catch (error) {
        console.error("Error fetching right side section:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
