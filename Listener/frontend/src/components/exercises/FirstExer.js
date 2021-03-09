import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const Wrapper = styled(Responsive)`
vertical-align : middle;
`;

const ExerCard = styled.div`
  display : inline-block;
`;

const FirstExer = () => {

    const useStyles = makeStyles({
        root: {
          maxWidth: '370px', 
          height: '100px',
          width : "170px",
          boxShadow: "1px 6px 6px 1px rgba(0, 0, 0, 0.2)",
          display : 'inline-block'
          
        },
        title: {
          fontSize: 15,
          marginBottom : '10px',
        },
        arrow: {
            display : 'inline-block',
            marginBottom : "100px",
            marginLeft : "30px",
            marginRight : "30px",
            color : "#1971c2"
        }
      });

      const classes = useStyles();


        return (
            <>
            <Wrapper>
                <ExerCard>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        STEP 1
                    </Typography>
                    <Typography variant="h5" component="h2">
                        스쿼트
                    </Typography>
                </CardContent>
            </Card>
            <ArrowForwardIosIcon className={classes.arrow}/>
            </ExerCard>
            <ExerCard>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        STEP 2
                    </Typography>
                    <Typography variant="h5" component="h2">
                        런지
                    </Typography>
                </CardContent>
            </Card>
            <ArrowForwardIosIcon className={classes.arrow}/>
            </ExerCard>
            <ExerCard>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        STEP 3
                    </Typography>
                    <Typography variant="h5" component="h2">
                        숄더프레스
                    </Typography>
                </CardContent>
            </Card>
            <ArrowForwardIosIcon className={classes.arrow}/>
            </ExerCard>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        STEP 4
                    </Typography>
                    <Typography variant="h5" component="h2">
                        나무자세
                    </Typography>
                </CardContent>
            </Card>
            </Wrapper>
            </>
    );

}

export default FirstExer;