export const selectPassword = (role: string) => {
  if (role === 'admin') return Bun.env.ADMIN_PW;
  else if (role === 'manager') return 'manager123';
  else if (role === 'developer') return 'developer';
  else return 'There is no role specified to set password';
};
