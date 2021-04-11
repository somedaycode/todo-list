package team_16.todolist.controller;

import org.springframework.web.bind.annotation.*;
import team_16.todolist.domain.Board;
import team_16.todolist.domain.Card;
import team_16.todolist.repository.BoardRepository;

@RestController
@RequestMapping("/{boardId}/cards")
public class CardController {

    private final BoardRepository boardRepository;

    public CardController(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @PostMapping()
    public Card createdCard(@PathVariable Long boardId, String title, String content) {
        Board board = boardRepository.findById(boardId).get();
        Card newCard = board.addCard(title, content);
        boardRepository.save(board);
        return newCard;
    }

    /*
    update 테스트 실패?
     */
    @PutMapping("/{cardId}")
    public Card updateCard(@PathVariable Long boardId, @PathVariable Long cardId, Card card) {
        Board board = boardRepository.findById(boardId).get();
        Card updateCard = board.updateCard(cardId, card);
        boardRepository.save(board);
        return updateCard;
    }

    @DeleteMapping("/{cardId}")
    public void deleteCard(@PathVariable Long boardId, @PathVariable Long cardId) {
        Board board = boardRepository.findById(boardId).get();
        board.deleteCard(cardId);
        boardRepository.save(board);
    }

}

