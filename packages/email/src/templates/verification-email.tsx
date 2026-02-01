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

interface VerificationEmailProps {
  userFirstName?: string;
  verificationLink: string;
}

export const VerificationEmail = ({ userFirstName, verificationLink }: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address for Starter</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Verify your email address</Heading>
          <Text style={text}>Hi {userFirstName ? userFirstName : "there"},</Text>
          <Text style={text}>
            Welcome to Starter! Please verify your email address by clicking the link below.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={verificationLink}>
              Verify Email Address
            </Button>
          </Section>
          <Text style={text}>
            or copy and paste this URL into your browser:{" "}
            <Link href={verificationLink} style={link}>
              {verificationLink}
            </Link>
          </Text>
          <Text style={footer}>
            If you didn't request this verification, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationEmail;

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
