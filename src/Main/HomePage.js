import styled from "styled-components"
import { Grid2 } from "@mui/material"




const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  min-height:600px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #555;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  text-align: left;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  padding: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 10px;
    font-size: 1rem;
    color: #333;

    &:before {
      content: '•';
      color: #007bff;
      margin-right: 8px;
    }
  }
`;

function HomePage () {
 return(
 <Container>
    <Title>Stay Organized, Boost Productivity</Title>
    <Subtitle>
      Our To-Do List app is your personal assistant, helping you manage your tasks efficiently.
      With its intuitive interface and powerful features, you can:
    </Subtitle>
    <Features>
      <Column>
        <SectionTitle>Create and Organize Tasks:</SectionTitle>
        <List>
          <li>Add tasks with detailed descriptions and due dates.</li>
          <li>Categorize tasks into different lists for better organization.</li>
          <li>Prioritize tasks to focus on what matters most.</li>
        </List>
        <SectionTitle>Track Progress:</SectionTitle>
        <List>
          <li>Mark tasks as completed to track your progress.</li>
          <li>Visualize your accomplishments with a clear overview of completed tasks.</li>
        </List>
        <SectionTitle>Set Reminders:</SectionTitle>
        <List>
          <li>Receive timely notifications to stay on top of deadlines.</li>
          <li>Never miss an important task again.</li>
        </List>
      </Column>
      <Column>
        <SectionTitle>Customize Your Experience:</SectionTitle>
        <List>
          <li>Personalize your to-do list with custom themes and settings.</li>
          <li>Tailor the app to your specific needs and preferences.</li>
        </List>
        <SectionTitle>Access Your Tasks Anywhere:</SectionTitle>
        <List>
          <li>Stay organized on the go with our mobile-friendly app.</li>
          <li>Sync your tasks across devices for seamless access.</li>
          <li>Simplify your life and boost your productivity with our To-Do List app.</li>
        </List>
      </Column>
    </Features>
  </Container>
 )
};
export default HomePage