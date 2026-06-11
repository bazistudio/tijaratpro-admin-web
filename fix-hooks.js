const fs = require('fs');
const path = require('path');

const filesToFix = [
  'app/(auth)/login/form.tsx',
  'app/(auth)/login/page.tsx',
  'app/(auth)/logout/page.tsx',
  'features/customers/hooks.ts',
  'features/inventory/hooks.ts',
  'features/products/hooks.ts',
  'features/sales/hooks.ts',
  'features/suppliers/hooks.ts',
];

for (const file of filesToFix) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix: const setAuth = useAuth((state) => state.setAuth); -> const { setAuth } = useAuth();
  content = content.replace(/const\s+([a-zA-Z0-9_]+)\s*=\s*useAuth\(\s*\([^)]*\)\s*=>\s*[^)]+\.\1\s*\);/g, 'const { $1 } = useAuth();');
  content = content.replace(/const\s+([a-zA-Z0-9_]+)\s*=\s*useAuth\(\(state\)\s*=>\s*state\.([a-zA-Z0-9_]+)\);/g, 'const { $2: $1 } = useAuth();');

  // Fix: return useAuth((s) => s.user?.shopId ?? ""); -> const { user } = useAuth(); return user?.shopId ?? "";
  // Wait, if it's inside a hook:
  // export function useShopId() { return useAuth((s) => s.user?.shopId ?? ""); }
  content = content.replace(/return\s+useAuth\(\s*\([^)]*\)\s*=>\s*[^.]+\.user\?\.shopId\s*\?\?\s*""\s*\);/g, 'const { user } = useAuth();\n  return user?.shopId ?? "";');

  // Fix: missing useAuthStore type or module import
  content = content.replace(/import \{ useAuthStore \} from "@\/lib\/auth\/auth\.store";/g, 'import { useAuth } from "@/lib/auth/AuthContext";');

  fs.writeFileSync(filePath, content, 'utf-8');
}
console.log("Fixed hooks selectors");
