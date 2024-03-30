import React, { useEffect, useState } from 'react';
import './style.css';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import preview from './assets/preview.png';
import Sidebar from '../sidebar-02/sidebar'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Board_content = () => {
  const { b_idx } = useParams();
  const [board, setBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/board/${b_idx}`)
      .then(response => {
        setBoard(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [b_idx]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const currentUserNick = '사용자 닉네임';
      const commentWithNick = `${currentUserNick}: ${newComment}`;
      setComments([...comments, commentWithNick]);
      setNewComment('');
    }
  };

  if (!board) return null; // 데이터가 아직 없을 때는 null을 반환

  // board 데이터를 이용해 렌더링
  return (
    <div>
      <Sidebar />
      <div className="board_content">
        <div id='present_content'>
          <article className="board_content_card">
            <div className="board_content_background" id='present_content_img'>
              <img src={preview} alt="Fetch API GraphQL Preview" />
            </div>
          </article>
          <div className="board_content_content">
            <div className="board_content_card-content ">
              <h2>{board.b_title}</h2>
              <p>{board.b_content}</p>
            </div>
            <div className="board_content_blog-preview__bottom">
              <div className="board_content_blog-author">
                <div className="board_content_blog-author__name">
                  <div className="board_content_blog-author__name">{board.user_nick}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='board_comment'>
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>댓글</Typography>
            <form id='comment_form' onSubmit={handleSubmit}>
              <TextField
                label="댓글을 입력하세요"
                variant="outlined"
                value={newComment}
                onChange={handleCommentChange}
                multiline
                rows={4}
                sx={{ width: '30%' }} // 너비를 100%로 설정
                inputProps={{ maxLength: 100 }} // 최대 입력 가능한 문자 수
                margin="normal"
              />
              <br></br>
              <Button type="submit" variant="contained" color="primary">댓글 작성</Button>
              <Grid container spacing={2}>
                {comments.map((comment, index) => (
                  <Grid item key={index} xs={12}>
                    <Box p={2} bgcolor="#f5f5f5" borderRadius={4}>
                      <Typography variant="body1">{comment}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </form>
          </Box>
        </div>
      </div >
    </div>
  );
};

export default Board_content;