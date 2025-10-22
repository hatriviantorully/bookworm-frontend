import User from "../models/User.js"; // ✅ STEP 1: User.js dieksekusi!

router.post("/register", async (req, res) => {
  console.log("📨 [Register] Starting registration process");

  try {
    const { email, username, password } = req.body;

    // Validasi input
    if (!username || !email || !password) {
      console.log("❌ [Register] Validation failed - missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("🔍 [Register] Checking for duplicate users...");

    // ✅ STEP 2: Query database menggunakan User model
    const existingEmail = await User.findOne({ email });
    console.log(
      "📧 [Register] Email check result:",
      existingEmail ? "Exists" : "Available"
    );

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    console.log(
      "👤 [Register] Username check result:",
      existingUsername ? "Exists" : "Available"
    );

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    console.log("✅ [Register] No duplicates found");

    // Generate profile image
    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
    console.log("🖼️ [Register] Generated profile image");

    // ✅ STEP 3: Buat instance User (BELUM disimpan)
    const user = new User({
      email,
      username,
      password, // ❗ Password masih plain text
      profileImage,
    });

    console.log("👤 [Register] User instance created (not saved yet)");
    console.log("🔐 [Register] Password before save:", password); // Jangan lakukan di production!

    // ✅ STEP 4: SIMPAN USER - INI YANG TRIGGER User.js HOOKS!
    console.log("💾 [Register] Calling user.save()...");
    await user.save(); // ⚡ TRIGGER pre-save hook di User.js!
    console.log("✅ [Register] User saved to database");
    console.log("🔐 [Register] Password after save:", user.password); // Sudah ter-hash

    // Generate token
    const token = generateToken(user._id);
    console.log("🔐 [Register] JWT token generated");

    // Response
    console.log("📤 [Register] Sending success response");
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("💥 [Register] Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
