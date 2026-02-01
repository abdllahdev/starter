import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PasswordResetEmailProps {
  userFirstName?: string;
  resetLink: string;
}

export const PasswordResetEmail = ({
  userFirstName,
  resetLink,
}: PasswordResetEmailProps): React.ReactNode => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password for Starter</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset your password</Heading>
          <Text style={text}>Hi {userFirstName ? userFirstName : "there"},</Text>
          <Text style={text}>
            Someone requested a password reset for your account. If this was you, click the button
            below to reset your password.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={resetLink}>
              Reset Password
            </Button>
          </Section>
          <Text style={text}>
            or copy and paste this URL into your browser:{" "}
            <Link href={resetLink} style={link}>
              {resetLink}
            </Link>
          </Text>
          <Text style={footer}>
            If you didn't request a password reset, you can safely ignore this email. Your password
            will not be changed.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PasswordResetEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.25",
  color: "#1a1a1a",
  marginBottom: "24px",
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#4a4a4a",
  marginBottom: "20px",
};

const buttonContainer = {
  padding: "20px 0",
};

const button = {
  backgroundColor: "#1a1a1a",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
};

const link = {
  color: "#1a1a1a",
  textDecoration: "underline",
};

const footer = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#8a8a8a",
  marginTop: "48px",
};
